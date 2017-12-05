const db = require("../models");
const cloudinary = require('cloudinary');
const keys = require("../config/keys");

module.exports = {

  findAllUserAlbums: function(req, res) {
    db.Albums
      .find({ owner: req.params.id })
      .sort({ _id: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  createAlbum: function(req, res) {
    console.log('createAlbum req.body: ', req.body)
    db.Albums
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  addPhototoAlbum: function(req, res) {
    // console.log('addPhototoAlbum req.body.photo: ', req.body.photo)
    db.Albums
      .findOneAndUpdate({ _id: req.params.album }, {$push: { photos: req.body.photo }}, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  createPhoto: function(req, res) {
    // console.log('createPhoto req.body.data_uri: ', req.body.data_uri);
    cloudinary.uploader.upload(req.body.data_uri, function(result) { 
        console.log('result: ', result);
      imageUploadId = result.public_id;
        // console.log('imageUploadId: ', imageUploadId);
      newObj = req.body;
      delete newObj['data_uri'];
        // console.log(newObj);
      newObj.imageUploadId = result.public_id;
        // console.log(newObj);
      db.Photos
        .create(newObj)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    });
  },

  findUser: function(req, res) {
    console.log('findUser req.body:' ,req.body)
    // db.Users
    // .find({_id:})
  },

  findUsersAlbums: function(req, res) {
  console.log(req.params.id);
  db.Albums
    .find({owner: req.params.id})
    .populate("photos")
    .populate("owner")
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  }
};