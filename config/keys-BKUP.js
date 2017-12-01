/* 
  - copy this file as keys.js in /config/ directory
  and manually populate with actual data

  - keys.js is listed in .gitignore 
  so actual data never posted publicly
*/

var cloudinary = require('cloudinary');

module.exports = 
  cloudinary.config({ 
    cloud_name: 'xxxxxxxx', 
    api_key: 'xxxxxxxx', 
    api_secret: 'xxxxxxxx' 
  });