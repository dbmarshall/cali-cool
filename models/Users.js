const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  passWord: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user'
  },
  profilePicture: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

var Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
