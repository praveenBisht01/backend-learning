const mongoose = require("mongoose");


function cont_to_db() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
        console.log("successfully connected to Database")
    })
}



module.exports = cont_to_db;
