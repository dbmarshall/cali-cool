const mongoose = require("mongoose");
const bcrypt   = require('bcrypt-nodejs');

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

UsersSchema.methods.generateHash = function(passWord) {
    return bcrypt.hashSync(passWord, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UsersSchema.methods.validPassword = function(passWord) {
    return bcrypt.compareSync(passWord, this.passWord);
};

var Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
