const mongoose = require("mongoose");

const Note_schema = new mongoose.Schema({
    title: String,
    description: String,
})

const Note_model = mongoose.model("Notes", Note_schema);

module.exports = Note_model;