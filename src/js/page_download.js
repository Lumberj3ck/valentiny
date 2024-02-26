import * as cheerio from 'cheerio';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function remove_redudant_ui(html) {
    html('.control_bar').remove();
    html('.system_ui').remove();
    html('script').remove();
    html('#get_html').remove();
    html('.image_input').remove();
}

function make_links_relative($) {
    $('img').each((index, el) => {
        var src = $(el).attr('src')
        if (!src.startsWith('data:')) {
            $(el).attr('src', `.${src}`)
        }
        else{
            // var file_type = src.match('data:/([a-zA-Z]+);') 
            // var data_img_name = `./src/assets/imgs/user_input_${index}.${file_type}`
            $(el).attr('src', $(el).attr('data-verbose-path'))
        }
    });
    $('link').each((index, el) => {
        if (!$(el).attr('href').startsWith('http')) {
            $(el).attr('href', `.${$(el).attr('href')}`);
        }
    });
}

function instantiate_dom() {
    var dom = document.documentElement.innerHTML;
    const $ = cheerio.load(dom);
    return $
}

function mutate_html() {
    var $ = instantiate_dom()
    remove_redudant_ui($)
    make_links_relative($)

    return $
}

function make_full_link(path, baseUrl){
    return path.startsWith('@') || path.startsWith('.') ? baseUrl + path.slice(1) : baseUrl + path 
}

function get_css_url_resourses(resources, baseUrl) {
    const elementsWithBackgroundImage = document.querySelectorAll('[style*="background-image"]');
    elementsWithBackgroundImage.forEach(element => {
        const styleAttributeValue = element.getAttribute('style');
        const url = styleAttributeValue.match(/url\(['"]?([^'"]+)['"]?\)/)[1];
        const full_url = make_full_link(url, baseUrl)
        resources.push({url: full_url, verbose_url: url});
    });
}

function get_resource_links(baseUrl) {
    const resources = [];
    document.querySelectorAll('img, link').forEach(element => {
        const url = element.getAttribute('src') || element.getAttribute('href');
        if (url && !url.startsWith('http')) {
            // var full_url = url.startsWith('@') || url.startsWith('.') ? baseUrl + url.slice(1) : baseUrl + url
            var full_url = make_full_link(url, baseUrl)
            url.startsWith('data:') ? resources.push({url: url, verbose_url:element.getAttribute('data-verbose-path')}) : resources.push({url: full_url, verbose_url: url})
        }
    });
    get_css_url_resourses(resources, baseUrl)
    return resources 
}

// function make_full_links(relativeResources, baseUrl) {
//     const fullRelativeUrls = relativeResources.map(el => {
//         // return url.startsWith('@') ? baseUrl + url.slice(1) :baseUrl + url
//         if (el.url.startsWith('@') || el.url.startsWith('.')) {
//             return baseUrl + el.url.slice(1)
//         }
//         else if (el.url.startsWith('data:')) {
//             return el.url
//         }
//         else {
//             return baseUrl + el.url
//         }

//     });
//     console.log(fullRelativeUrls)
//     return fullRelativeUrls
// }

async function get_resourses(fullRelativeUrls, dom) {
    var zip = JSZip()
    zip.file('index.html', dom.html())
    await Promise.all(fullRelativeUrls.map(async url => {
        console.log(url)
        const response = await fetch(url.url);
        const blob = await response.blob();
        // var relativePath = url.replace(`${baseUrl}/`, '');
        // if (url.startsWith('data:')) {
        //     relativePath = 'some_user_input.jpeg'
        // }
        zip.file(url.verbose_url, blob, { binary: true });
    }));
    return zip
}

function download_archive(zip) {
    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            saveAs(content, "Postcard.zip");
        });
}

async function get_page() {
    const baseUrl = window.location.origin;
    const resourse_links = get_resource_links(baseUrl)
    var $ = mutate_html()


    // const fullRelativeUrls = make_full_links(relativeResources, baseUrl)
    
    var zip = await get_resourses(resourse_links, $)
    download_archive(zip)
}

export { get_page, remove_redudant_ui, instantiate_dom }
