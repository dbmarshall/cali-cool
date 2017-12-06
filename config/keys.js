// add this file to gitignore

const cloudinary = require('cloudinary');
const express = require("express");
const app = express();
const session = require('express-session');
let keys = null; 

  if (process.env.port) {
      console.log('process.env.port');
   keys =
      { 'cloudinary': cloudinary.config({ 
                cloud_name: process.env.cloud_name, 
                api_key: process.env.api_key, 
                api_secret: process.env.api_secret
              }),
        'secret': process.env.secret
      }
  } else {
      console.log('ELSE process.env.port');
  const localkeys = require('./local-keys');
  keys =
      { 'cloudinary': cloudinary.config({ 
                cloud_name: localkeys.cloud_name, 
                api_key: localkeys.api_key, 
                api_secret: localkeys.api_secret
              }),
        'secret': localkeys.secret
      }
  }

  module.exports = keys;