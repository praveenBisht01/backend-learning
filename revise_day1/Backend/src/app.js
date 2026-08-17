const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const Note_model = require("./model/notemodel");

// post data on database   //
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await Note_model.create({
    title,
    description,
  });

  res.status(201).json({
    Message: "note created successfully",
    note,
  });
});

// get data from Database //

app.get("/api/notes", async (req, res) => {
  const note = await Note_model.find();

  res.status(200).json({
    Message: "note Fetched successfully",
    note,
  });
});

// delete noted by ID   //

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const note_delete = await Note_model.findByIdAndDelete(id);

  res.status(200).json({
    Message: "note delete successfully",
    note_delete,
  });
});

//  Update the note //

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;
  note_update = await Note_model.findByIdAndUpdate(id, { description });

  res.status(200).json({
    Message: "note update successfully",
    note_update,
  });
});

module.exports = app;
