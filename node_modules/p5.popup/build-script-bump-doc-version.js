let pjson = require('./package.json');
let version = pjson.version
console.log(version)
const replace = require('replace-in-file');
const options = {
  files: 'README.md',
  // example of what regex does regexr.com/57k2e
  from: /(\@)(\d+)\.(\d+)\.(\d+)/g,
  to: "@"+version,
};

try {
    const results = replace.sync(options);
    console.log('Replacement results:', results);
  }
  catch (error) {
    console.error('Error occurred:', error);
  }

  
  try {
      const results = replace.sync({
        files: 'p5.popup.js',
        // example of what regex does regexr.com/57k30
        from: /(v)(\d+)\.(\d+)\.(\d+)/g,
        to: "v"+version,
      });
      console.log('Replacement results:', results);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }