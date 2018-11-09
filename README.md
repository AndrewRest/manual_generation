## Installation
1) npm install

## Run script
2) node pdf_generate.js --source="HowToInstall.html?win" --target="pdf/Windows manual.pdf" - generate win manual
 
  node pdf_generate.js --source="HowToInstall.html" - generate win and OSX manual and save in "pdf" directory

Script has follow arguments:
1. source - path to html file with params
2. target - path and file name

Default path and name - pdf/win.pdf || pdf/osx.pdf || pdf/winOSX.pdf

Source file at the moment - HowToInstall.html
Result files in 'pdf' folder
