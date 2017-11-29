const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var InviteesSchema = new Schema({
  invitor: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  inviteCode: {
    type: String,
    required: true,
    unique: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

var Invitees = mongoose.model("Invitees", InviteesSchema);

module.exports = Invitees;
