const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique:[true,"with this email user account is already exist "]
    },
    password: String,
})


const userModel = mongoose.model("Users", userSchema)
 
module.exports = userModel