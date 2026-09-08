const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    usernsme: String,
   email: {
        type: String,
        unique: [true,"user with thid email is already exist "]
    },
    password: String,
})


const UserModel = mongoose.model("Users", UserSchema)


module.exports = UserModel 