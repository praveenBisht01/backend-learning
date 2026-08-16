const mongoose = require("mongoose");
require("dotenv").config();

function Cnt_to_DB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log("MongoDB connection failed:", err);
    });
}

module.exports = Cnt_to_DB;
