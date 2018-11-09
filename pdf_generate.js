const STATIC_FILE_PATH = 'file:///' + __dirname.replace(/\\/g,'/') + '/src/';
const ADDITIONAL_CSS_PLACEHOLDER = '{{additional_css}}';
const WIN = "win";
const OSX = "osx";

const argv = require('minimist')(process.argv.slice(2));
const pdf = require('html-pdf');
const fs = require('fs');
const options = require('./config');

options.base = STATIC_FILE_PATH;
const qAt = argv.source.indexOf("?");


if (qAt === -1) {
    const html = fs.readFileSync('./src/'+ argv.source, 'utf8');
    createForWinAndOSX(html);
} else {
    const param = argv.source.substr(qAt+1).toLowerCase();
    const htmlName=argv.source.substr(0, qAt);
    const html = fs.readFileSync('./src/'+ htmlName, 'utf8');
    if (param === WIN) createForWin(html);
    if (param === OSX) createForOSX(html);
}

function createForWin(html) {
    console.log('Create html for Windows...');
    const winHtml = html.replace(ADDITIONAL_CSS_PLACEHOLDER, STATIC_FILE_PATH + 'win.css');
    console.log('Created');

    pdf.create(winHtml, options).toFile(argv.target || 'pdf/win.pdf', (err, res) => {
        if (err) return console.error("Error during win.pdf creation", err);
        console.log("win.pdf is created");
        console.log(res);
    });
}

function createForOSX(html) {
    console.log('Create html for OSX...');
    const osxHtml = html.replace(ADDITIONAL_CSS_PLACEHOLDER, STATIC_FILE_PATH + 'osx.css');
    console.log('Created');

    pdf.create(osxHtml, options).toFile(argv.target || 'pdf/osx.pdf', (err, res) => {
        if (err) return console.error("Error during osx.pdf creation", err);
        console.log("osx.pdf is created");
        console.log(res);
    });
}

function createForWinAndOSX(html) {
    console.log('Create html for Win and OSX');
    const winOsxHtml = html.replace(ADDITIONAL_CSS_PLACEHOLDER, STATIC_FILE_PATH);
    console.log('Created');

    pdf.create(winOsxHtml, options).toFile(argv.target || 'pdf/winOSX.pdf', (err, res) => {
        if (err) return console.error("Error during winAndOSx.pdf creation", err);
        console.log("winAndOSX.pdf is created");
        console.log(res);
    });
}
