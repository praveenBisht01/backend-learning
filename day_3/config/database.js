const mongoose = require("mongoose")

function connectTOdb() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("connected to DB");
    })
}                                                                                           


module.exports = connectTOdb    