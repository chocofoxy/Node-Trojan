const fs = require('fs');

fs.writeFile('ali miboun.txt', 'hhhhhhhhhhhhhh', function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  }); 
  /*const childProcess = require("child_process");



  childProcess.exec('curl -o img.webp http://ee335232f60d.ngrok.io/marguerite-729510__340.webp');*/
