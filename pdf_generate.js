let fs = require('fs');
let path = require('path')
let pdf = require('html-pdf');
let html = fs.readFileSync('./src/index2.html', 'utf8');
let options = require('./config');

const ADDITIONAL_CSS_PLACEHOLDER = '{{additional_css}}';
const STATIC_FILE_PATH = 'file:///' + __dirname.replace(/\\/g,'/') + '/src/';

console.log('Create html for Windows...');
let winHtml = html.replace(ADDITIONAL_CSS_PLACEHOLDER, STATIC_FILE_PATH + 'win.css');
console.log('Created');

console.log('Create html for OSX...');
let osxHtml = html.replace(ADDITIONAL_CSS_PLACEHOLDER, STATIC_FILE_PATH + 'osx.css');
console.log('Created');

pdf.create(winHtml, options).toFile('pdf/win.pdf', function(err, res) {
  if (err) return console.error("Error during win.pdf creation", err);
  console.log("win.pdf is created");
  console.log(res);

  pdf.create(osxHtml, options).toFile('pdf/osx.pdf', function(err, res) {
      if (err) return console.error("Error during osx.pdf creation", err);
      console.log("osx.pdf is created");
      console.log(res);
    });
});

