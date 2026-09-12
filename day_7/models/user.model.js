const mongoose = require("mongoose");
const Cnt_to_DB = require("../config/Database");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "User name is already Exist"],
    required: true,
  },

  email: {
    type: String,
    unique: [true, "Email already Exist"],
    required: [true, "Email is required"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  bio: {
    type: String,
  },

  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/vg0av8xap/Default_user.jpg",
  },
});

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
