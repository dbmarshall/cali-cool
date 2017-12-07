const db = require("../models");

module.exports = {
  findById: function(req, res) {
    db.Albums
      .findById(req.params.id)
      .populate({
        path: "photos",
        populate: [{
          path: "owner",
          model: "Users",
          select: ["_id", "userName"]
        },
        {
          path: "album",
          model: "Albums",
          select: ["_id", "title"]
        }]
      })
      .populate("owner")
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          model: 'Users'
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getTitles: function(req, res){
    db.Albums
      .find({},{title: 1})
      .then(dbModel => {
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  searchByTitle: function(req, res){
    const regex = new RegExp(req.params.searchStr, 'i');
    db.Albums
      .find( {title: { $regex: regex }})
      .populate("photos")
      .populate("owner")
      .limit(12)
      .then(dbModel => {
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  insertCommentIntoAlbumArray: function(req, res) {
    console.log("album id", req.params.id)
    console.log("comment id", req.body.commentId)
    db.Albums
    .findOneAndUpdate({ _id: req.params.id }, {$push: { comments: req.body.commentId }}, { new: true })
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
        model: 'Users'
      }
    })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  }
};  