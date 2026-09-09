const mongoose = require("mongoose");

const userSChema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: [true, "user with this eail address is already exist "],
  },
  password: String,
});

const Usermodel = mongoose.model("Users", userSChema);

module.exports = Usermodel;

 