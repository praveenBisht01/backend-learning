const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());




const authroutr = require("../routes/auth.routes");
const UserModel = require("../models/user_model");

app.use("/api/auth", authroutr);
module.exports = app;
