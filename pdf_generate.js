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
    createPDF(html);
} else {
    const osType = argv.source.substr(qAt+1).toLowerCase();
    const htmlName=argv.source.substr(0, qAt);
    const html = fs.readFileSync('./src/'+ htmlName, 'utf8');
    createPDF(html, osType);
}

function createPDF(html, osType) {
    console.log('Create html');
    if (osType) {
        if (osType === WIN) {
            const osTypeHtml = html.replace(ADDITIONAL_CSS_PLACEHOLDER, STATIC_FILE_PATH + 'win.css');
            console.log('Created');
            generatePDF(osTypeHtml, argv.target || 'pdf/win.pdf')
        }
        if (osType === OSX) {
            const osTypeHtml = html.replace(ADDITIONAL_CSS_PLACEHOLDER, STATIC_FILE_PATH + 'osx.css');
            console.log('Created');
            generatePDF(osTypeHtml, argv.target || 'pdf/osx.pdf')
        }
    } else {
        const osTypeHtml = html.replace(ADDITIONAL_CSS_PLACEHOLDER, STATIC_FILE_PATH);
        console.log('Created');
        generatePDF(osTypeHtml, argv.target || 'pdf/winOSX.pdf')
    }
}

function generatePDF(osTypeHtml, path) {
    pdf.create(osTypeHtml, options).toFile(path, (err, res) => {
        if (err) return console.error("Error during winAndOSx.pdf creation", err);
        console.log("Pdf is created");
        console.log(res);
    });
}
