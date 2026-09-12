const mongoose = require("mongoose");

const User_schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("Users", User_schema);
module.exports = UserModel;
