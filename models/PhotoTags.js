const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PhotoTagsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  photos: [{
    type: Schema.Types.ObjectId,
    ref: "Photos"
  }]
});

var PhotoTags = mongoose.model("PhotoTags", PhotoTagsSchema);

module.exports = PhotoTags;
