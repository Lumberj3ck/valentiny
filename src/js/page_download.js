import JSZip from 'jszip';
import { saveAs } from 'file-saver';


const baseUrl = window.location.origin;
function removeRedundantUI(document) {
    const controlBars = document.querySelectorAll('.control_bar');
    controlBars.forEach((el) => {
        el.parentNode.removeChild(el);
    });

    const systemUIs = document.querySelectorAll('.system_ui');
    systemUIs.forEach((el) => {
        el.parentNode.removeChild(el);
    });

    const scripts = document.querySelectorAll('script');
    scripts.forEach((el) => {
        el.parentNode.removeChild(el);
    });

    const getHtml = document.querySelector('#get_html');
    if (getHtml) {
        getHtml.parentNode.removeChild(getHtml);
    }
}

function is_url_relative(url) {
    return url.startsWith('http') ? false : true
}

function set_verbose_path_as_src(el, src, attr_name) {
    if (src && !src.startsWith('data:')) {
        el.setAttribute(attr_name, `.${src}`);
    } else {
        const verbosePath = el.getAttribute('data-verbose-path');
        if (verbosePath) {
            el.setAttribute(attr_name, verbosePath);
        }
    }
}

function set_resourse_path(document) {
    const images = document.querySelectorAll('img');
    images.forEach((el, index) => {
        const src = el.getAttribute('src');
        if (!is_url_relative(src)) {
            return
        }
        set_verbose_path_as_src(el, src, 'src')
    });

    const links = document.querySelectorAll('link');
    links.forEach((el) => {
        const href = el.getAttribute('href');
        if (!is_url_relative(href)) {
            return
        }
        set_verbose_path_as_src(el, href, 'href')
    });
}


function instantiate_dom_node() {
    var dom_node = document.documentElement.cloneNode(true)
    return dom_node
}

function make_new_url_path(css_property, element) {
    const url_regex = /url\(['"]?([^'"]+)['"]?\)/
    var url = css_property.match(url_regex)[1]
    if (url.startsWith('http')) {
        url = url.replace(baseUrl, '.')
    }
    else if (url.startsWith('data:')) {
        url = element.getAttribute('data-verbose-path')
    }
    else {
        url = '.' + url
    }
    return css_property.replace(url_regex, `url(${url})`)
}

function mutate_css_links(node) {
    const elementsWithBackgroundImage = node.querySelectorAll('[style*="background-image"]');
    elementsWithBackgroundImage.forEach(element => {
        const styleAttributeValue = element.getAttribute('style');
        var mutated_style = make_new_url_path(styleAttributeValue, element)
        element.setAttribute('style', mutated_style)
    });
}

function remove_crossorigin_attribute(node) {
    // remove in sake of better user experience
    node.querySelectorAll('link[rel="stylesheet"][href]:not([href^="http"]').forEach((el) => el.removeAttribute('crossorigin'))
}


function mutate_html(dom) {
    removeRedundantUI(dom)
    set_resourse_path(dom)
    mutate_css_links(dom)
    remove_crossorigin_attribute(dom)

    return dom
}

function make_full_link(path, baseUrl) {
    if (path.startsWith('http')) {
        return path
    }
    return path.startsWith('@') || path.startsWith('.') ? baseUrl + path.slice(1) : baseUrl + path
}

function push_url(element, url, resources) {
    const baseUrl = window.location.origin;
    if (url.startsWith('data:')) {
        resources.push({ url: url, verbose_url: element.getAttribute('data-verbose-path') })
    }
    else if (url.startsWith('http')) {
        resources.push({ url: url, verbose_url: url.replace(baseUrl + '/', '') })
    }
    else {
        const full_url = make_full_link(url, baseUrl)
        resources.push({ url: full_url, verbose_url: url })
    }
}


function get_css_url_resourses(resources) {
    const elementsWithBackgroundImage = document.querySelectorAll('[style*="background-image"]');
    elementsWithBackgroundImage.forEach(element => {
        const styleAttributeValue = element.getAttribute('style');
        const url = styleAttributeValue.match(/url\(['"]?([^'"]+)['"]?\)/)[1];
        push_url(element, url, resources)
    });
}

function filter_foreign_and_push(url, element, resources) {
    if (url.startsWith(baseUrl)) {
        push_url(element, url, resources)
    }
    else if (url.startsWith('http')) {
        return;
    }
    else {
        push_url(element, url, resources)
    }
}

function get_resource_links(node) {
    const resources = [];
    node.querySelectorAll('img, link').forEach(element => {
        const url = element.getAttribute('src') || element.getAttribute('href');
        if (url) {
            filter_foreign_and_push(url, element, resources)
        }
    });
    get_css_url_resourses(resources)
    return resources
}


async function get_resourses(fullRelativeUrls, html) {
    var zip = JSZip()
    zip.file('index.html', html)
    await Promise.all(fullRelativeUrls.map(async url => {
        const response = await fetch(url.url);
        const blob = await response.blob();
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

function remove_hidden_elements(dom) {
    const hiddenElements = dom.querySelectorAll('[style*="display: none;"]');

    hiddenElements.forEach(element => {
        element.remove();
    });
}

async function get_page() {
    var dom = instantiate_dom_node()
    remove_hidden_elements(dom)

    const resourse_links = get_resource_links(dom)
    var node = mutate_html(dom)
    var zip = await get_resourses(resourse_links, node.outerHTML)
    download_archive(zip)
}

export { get_page }
