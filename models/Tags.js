const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TagsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

var Tags = mongoose.model("Tags", TagsSchema);

module.exports = Tags;
