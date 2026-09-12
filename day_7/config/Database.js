const mongoose  = require("mongoose")

async function Cnt_to_DB() {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to Database")
}




module.exports = Cnt_to_DB;
