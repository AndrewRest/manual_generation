let fs = require('fs');
let pdf = require('html-pdf');
let html = fs.readFileSync('./src/index.html', 'utf8');
let options = require('./config');


pdf.create(html, options).toFile('pdf/index.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res);
});