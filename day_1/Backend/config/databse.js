const mongoose = require("mongoose");
require("dotenv").config();

function Cnt_to_DB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("MongoDB connected");
        })
}


module.exports = Cnt_to_DB;