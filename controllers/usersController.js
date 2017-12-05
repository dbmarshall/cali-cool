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
  },
  findUser: function(req, res) {
    console.log('findUser req.body:' ,req.body)
    // db.Users
    // .find({_id:})
  },
    findUsersAlbums: function(req, res) {
    console.log(req);
  //   db.Albums
  //     .find({req.params.id})
  //     .populate("photos")
  //     .populate("owner")
  //     .populate("comments")
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  },
  likePhoto: function(req, res) {
    console.log(req.params.id, req.params.photoId)
    db.Users
    .findById(req.params.id)
    .then( user => {
      return db.Photos.findOneAndUpdate({"_id": req.params.photoId}, 
      { $addToSet: { likes: user._id }}, { new: true });
    })
    .then(function(photo){
      res.json(photo);
    })
    .catch(function(error){
      res.json(error);
    });
  },
  dislikePhoto: function(req, res){
    console.log(req.params.id, req.params.photoId)
    db.Users
    .findById(req.params.id)
    .then( user => {
      console.log(user);
      return db.Photos.findOneAndUpdate({"_id": req.params.photoId}, 
      { $pull: { likes: user._id }}, { new: true });
    })
    .then(function(photo){
      console.log(photo)
      res.json(photo);
    })
    .catch(function(error){
      res.json(error);
    });
  }
};