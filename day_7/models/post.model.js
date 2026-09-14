const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },

  imgURL: {
    type: String,
    required: [true, "image_URL is required for creating an post "],
  },

  user: {
    ref: "users",
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User_id is required for creating an post "],
  },
});

const postModel = mongoose.model("Posts", postSchema);

module.exports = postModel;
