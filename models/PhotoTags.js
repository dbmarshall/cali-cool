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

var PhotoTags = mongoose.model("Tags", PhotoTagsSchema);

module.exports = PhotoTags;
