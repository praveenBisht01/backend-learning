const mongoose = require("mongoose");

function CntToDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    console.log("server is connected to Database");
  });
}

module.exports = CntToDB;
