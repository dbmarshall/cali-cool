const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  }
});

var Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;
