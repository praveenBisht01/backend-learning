const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors())
const Note_model = require("../model/notesModel");


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

app.get("/api/notes", async (req, res) => {
  const notes = await Note_model.find();

  res.status(200).json({
    Message: "note fetched successfully",
    notes,
  });
});

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  const notes = await Note_model.findByIdAndDelete(id);

  res.status(200).json({
    Message: "note delete successfully",
    notes,
  });
});

app.patch("/api/notes/:id", async (req, res) => {

    const id = req.params.id
    const { description } = req.body
  

    

    await Note_model.findByIdAndUpdate(id, { description })
    
    res.status(200).json({
        Message:"note updated successsfully"
    })
    
})
module.exports = app;

