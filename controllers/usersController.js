const db = require("../models");

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
    console.log('addPhototoAlbum req.body.photo: ', req.body.photo)
    db.Albums
      .findOneAndUpdate({ _id: req.params.album }, {$push: { photos: req.body.photo }}, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createPhoto: function(req, res) {
    console.log('createPhoto req.body: ', req.body)
    db.Photos
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};