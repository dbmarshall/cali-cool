const mongoose = require("mongoose");

// Save reference to Schema constructor
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true 
  },
  comment: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
