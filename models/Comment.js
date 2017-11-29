const mongoose = require("mongoose");

// Save reference to Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
const CommentSchema = new Schema({
  body: String
});

// Creates model from above schema
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
