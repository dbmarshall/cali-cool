const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var schemaOptions = {
    toObject: {
      virtuals: true
    }
    ,toJSON: {
      virtuals: true
    }
  };

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
  }//,
  // Fields to be removed
  // thumbnail: {
  //   type: String,
  //   // required: true
  // },
  // link: {
  //   type: String
  //   // required: true
  // }

}, schemaOptions);

PhotosSchema.virtual('likesCount').
  get(function(){
    return this.likes.length;
});

/* 
  Actual URL looks like this:
    http://res.cloudinary.com/cali-cool/image/upload/f_auto/c_thumb,g_center,h_200,w_200/ucb/jack_02-tdih-jan05-HD.jpg
*/

const baseUrl = 'http://res.cloudinary.com/cali-cool/image/upload/';
const imageLarge = 'f_auto,w_1600/';
const imageThumb = 'f_auto,c_thumb,g_center,h_300,w_300/';
const imageExtension = '.png';

PhotosSchema.virtual('imageUrl').
  get(function(){
    return baseUrl + imageLarge + this.imageUploadId + imageExtension;
});

PhotosSchema.virtual('thumbnailUrl').
  get(function(){
    return baseUrl + imageThumb + this.imageUploadId + imageExtension;
});

var Photos = mongoose.model("Photos", PhotosSchema);

module.exports = Photos;
