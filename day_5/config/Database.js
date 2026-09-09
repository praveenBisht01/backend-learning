const mongoose = require("mongoose");

function Cnt_to_DB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Server is connected to Database");
    })
    .catch((error) => {
      console.log("Database connection failed:", error.message);
    });
}

module.exports = Cnt_to_DB;
