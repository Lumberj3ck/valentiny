import * as cheerio from 'cheerio';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function remove_redudant_ui(html){
    html('.control_bar').remove();
    html('script').remove();
    html('#get_html').remove();
}

function make_links_relative($){
    $('img').each((index, el) => { $(el).attr('src', `.${$(el).attr('src')}`) });
    $('link').each((index, el) => {
        if (!$(el).attr('href').startsWith('http')) {
            $(el).attr('href', `.${$(el).attr('href')}`);
        }
    });
}

function mutate_html(){
    var dom = document.documentElement.innerHTML;
    const $ = cheerio.load(dom);

    remove_redudant_ui($)
    make_links_relative($)

    return $
}

function get_resource_links(){
    const relativeResources = [];
    document.querySelectorAll('img, link').forEach(element => {
        const url = element.getAttribute('src') || element.getAttribute('href');
        if (url && !url.startsWith('http') && !url.startsWith('data:')) {
            relativeResources.push(url);
        }
    });
    return relativeResources
}

function make_full_links(relativeResources, baseUrl){
    const fullRelativeUrls = relativeResources.map(url => baseUrl + url);
    return fullRelativeUrls
}

async function get_resourses(fullRelativeUrls, dom, baseUrl){
    var zip = JSZip()
    zip.file('index.html', dom.html())
    await Promise.all(fullRelativeUrls.map(async url => {
        const response = await fetch(url);
        const blob = await response.blob();
        const relativePath = url.replace(`${baseUrl}/`, '');
        zip.file(relativePath, blob, { binary: true });
    }));
    return zip
}

function download_archive(zip){
    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            saveAs(content, "Postcard.zip");
        });
}

export default async function get_page() {
    const relativeResources = get_resource_links()
    var $ = mutate_html()


    const baseUrl = window.location.origin;
    const fullRelativeUrls = make_full_links(relativeResources, baseUrl)

    var zip = await get_resourses(fullRelativeUrls, $, baseUrl)
    download_archive(zip)
}
