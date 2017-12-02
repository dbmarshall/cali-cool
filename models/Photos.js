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
  //use $addToSet to push data to prevent duplication
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "Users"
  }],
  imageUploadId: {
    type: String,
    // TBD: enforce it to true when upload feature is implemented
    // required: true,
    // unique: true
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
  title: {
    type: String,
    required: true
  },
  caption: {
    type: String
  },
  // Fields to be removed
  thumbnail: {
    type: String,
    // required: true
  },
  link: {
    type: String
    // required: true
  }

});

PhotosSchema.virtual('likesCount').
  get(function(){
    return this.likes.length;
});

const baseUrl = 'https://res.cloudinary.com/cali-cool/image/upload/';
const imageExtension = '.png';

PhotosSchema.virtual('imageUrl').
  get(function(){
    return baseUrl + this.imageUploadId + imageExtension;
});

PhotosSchema.virtual('thumbnailUrl').
  get(function(){
    return baseUrl + 'c_thumb,g_center,h_200,w_200/' + this.imageUploadId + '/.png';
});

var Photos = mongoose.model("Photos", PhotosSchema);

module.exports = Photos;
