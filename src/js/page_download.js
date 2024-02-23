import * as cheerio from 'cheerio';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
// var htmlContent = document.documentElement.innerHTML;

function mutate_html(){
    var fullyRenderedHtml = document.documentElement.innerHTML;
    const $ = cheerio.load(fullyRenderedHtml);
    $('.control_bar').remove();
    $('script').remove();
    $('#get_html').remove();
    $('img').each((index, el) => { $(el).attr('src', `.${$(el).attr('src')}`) });
    $('link').each((index, el) => {
        if (!$(el).attr('href').startsWith('http')) {
            $(el).attr('href', `.${$(el).attr('href')}`);
        }
    });
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

async function get_resourses(fullRelativeUrls, html, baseUrl){
    var zip = JSZip()
    zip.file('index.html', html.html())
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
            saveAs(content, "example.zip");
        });
}

export default async function get_html() {
    // var zip = JSZip()
    const relativeResources = get_resource_links()
    // const relativeResources = [];
    // document.querySelectorAll('img, link').forEach(element => {
    //     const url = element.getAttribute('src') || element.getAttribute('href');
    //     if (url && !url.startsWith('http') && !url.startsWith('data:')) {
    //         relativeResources.push(url);
    //     }
    // });
    var $ = mutate_html()
    // var fullyRenderedHtml = document.documentElement.innerHTML;
    // const $ = cheerio.load(fullyRenderedHtml);
    // $('.control_bar').remove();
    // $('script').remove();
    // $('#get_html').remove();
    // $('img').each((index, el) => { $(el).attr('src', `.${$(el).attr('src')}`) });
    // $('link').each((index, el) => {
    //     if (!$(el).attr('href').startsWith('http')) {
    //         $(el).attr('href', `.${$(el).attr('href')}`);
    //     }
    // });



    const baseUrl = window.location.origin;
    // const fullRelativeUrls = relativeResources.map(url => baseUrl + url);
    const fullRelativeUrls = make_full_links(relativeResources, baseUrl)

    console.log(fullRelativeUrls)
    var zip = await get_resourses(fullRelativeUrls, $, baseUrl)
    // await Promise.all(fullRelativeUrls.map(async url => {
    //     const response = await fetch(url);
    //     const blob = await response.blob();
    //     const relativePath = url.replace(`${baseUrl}/`, '');
    //     zip.file(relativePath, blob, { binary: true });
    // }));

    // zip.file('index.html', $.html())
    // zip.generateAsync({ type: "blob" })
    //     .then(function (content) {
    //         saveAs(content, "example.zip");
    //     });
    download_archive(zip)
    // console.log($.html())
}

