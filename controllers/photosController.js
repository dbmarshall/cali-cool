const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Photos
    .find(req.query)
    .populate("album")
    .populate("owner")
    .sort({ _id: -1 })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  recent: function(req, res) {
    db.Photos
    .find()
    .populate({
      path: "album",
      select: ["_id", "title"]

    })
    .populate({
      path: "owner",
      select: ["_id", "userName"]
    })
    .limit(12)
    .sort({ dateCreated: -1 })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  mostLiked: function(req, res){
    var oneDay = (1000 * 60 * 60 * 24);
    var twoWeeksBack = new Date(new Date() - (14 * oneDay));
    console.log(new Date(twoWeeksBack));

    db.Photos.aggregate([
      {$match: { dateUpdated : { $gte: twoWeeksBack}}},
      {$unwind: "$likes"}, 
      {$group: {_id:"$_id", size: {$sum: 1}}},
      {$sort: {size:-1}},
      {$project: { caption: "$caption", _id: "$_id"}},
      ])
      .limit(12)
      .then(photos => {
        const photoIdArray = photos.map(function(photo){
          return photo._id;
        });
        
        db.Photos
        .find( {_id : { $in : photoIdArray }})
        .populate({
          path: "album",
          select: ["_id", "title"]
        })
        .populate({
          path: "owner",
          select: ["_id", "userName"]
        })
        .then(photoDBModels => {
          let results = [];
          photoIdArray.forEach(function(refPhotoId){
            let result = photoDBModels.filter(function(photoObj){
              return (refPhotoId.toString() == photoObj._id.toString());
            });
            results.push(result[0]);
          });
          res.json(results);
        })
      })
      .catch(err => res.status(422).json(err));
  },
  getSinglePhoto: function(req, res) {
    db.Photos
    .find({_id: req.params.id})
    .populate("comments")
    .populate("owner")
    .populate("album")
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },

  deletePhoto: function(req, res) {
    // console.log(req.params.id)
    db.Photos
    .find({_id: req.params.id})

  }
};