const pdf = require('html-pdf');
const fs = require('fs');
const html = fs.readFileSync('./src/HowToInstall.html', 'utf8');
const options = require('./config');
const ADDITIONAL_CSS_PLACEHOLDER = '{{additional_css}}';
const STATIC_FILE_PATH = 'file:///' + __dirname.replace(/\\/g,'/') + '/src/';
const argv = require('minimist')(process.argv.slice(2));

console.log('Create html for Windows...');
const winHtml = html.replace(ADDITIONAL_CSS_PLACEHOLDER, STATIC_FILE_PATH + 'win.css');
console.log('Created');

console.log('Create html for OSX...');
const osxHtml = html.replace(ADDITIONAL_CSS_PLACEHOLDER, STATIC_FILE_PATH + 'osx.css');
console.log('Created');

console.log('Create html for Win and Mac');
const winOsxHtml = html.replace(ADDITIONAL_CSS_PLACEHOLDER, STATIC_FILE_PATH);

pdf.create(winHtml, options).toFile(argv.win || 'pdf/win.pdf', (err, res) => {
  if (err) return console.error("Error during win.pdf creation", err);
  console.log("win.pdf is created");
  console.log(res);
});

pdf.create(osxHtml, options).toFile(argv.mac || 'pdf/osx.pdf', (err, res) => {
  if (err) return console.error("Error during osx.pdf creation", err);
  console.log("osx.pdf is created");
  console.log(res);
});

pdf.create(winOsxHtml, options).toFile(argv.winMac || 'pdf/winMac.pdf', (err, res) => {
  if (err) return console.error("Error during winAndOSx.pdf creation", err);
  console.log("winAndOSX.pdf is created");
  console.log(res);
});

