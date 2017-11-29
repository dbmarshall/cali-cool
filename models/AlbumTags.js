const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AlbumTagsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  albums: [{
    type: Schema.Types.ObjectId,
    ref: "Albums"
  }]
});

var AlbumTags = mongoose.model("Tags", AlbumTagsSchema);

module.exports = AlbumTags;
