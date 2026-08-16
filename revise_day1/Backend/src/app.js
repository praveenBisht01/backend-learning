const express = require("express")
const app = express()
const mongoose = require("mongoose")
app.use(express.json());
const Note_model = require("./model/notemodel")

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await Note_model.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

module.exports = app;


