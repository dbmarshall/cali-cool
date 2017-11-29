const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PhotosSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: "Albums",
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comments"
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "Users"
  }],
  link: {
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
    ref: "PhotoTags"
  }],
  thumbnail: {
    type: String,
    required: true
  }
});

PhotosSchema.virtual('likesCount').
  get(function(){
    return this.likes.length;
});

var Photos = mongoose.model("Photos", PhotosSchema);

module.exports = Photos;
