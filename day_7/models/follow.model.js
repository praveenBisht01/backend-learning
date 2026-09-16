const mongoose = require("mongoose");

const follow_Schema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "follower is required"],
    },

    followee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "followee is required"],
    },
  },
  {
    timestamps: true,
  },
);

const follow_Model = mongoose.model("follow", follow_Schema);

module.exports = follow_Model;
