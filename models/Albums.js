const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AlbumsSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  photos: [{
    type: Schema.Types.ObjectId,
    ref: "Photos"
    // TBD: Cannot enforce in both direction
    // required: true
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comments"
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "Users"
  }],
  title: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: "AlbumTags"
  }]
});

var Albums = mongoose.model("Albums", AlbumsSchema);

module.exports = Albums;
