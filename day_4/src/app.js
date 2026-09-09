const express = require("express");
const app = express();
const mongoose = require("mongoose");
    
app.use(express.json());
const cookieparser = require("cookie-parser");
app.use(cookieparser());
const authroutr = require("../routes/Auth.routes")



app.use("/api/auth" , authroutr)
module.exports = app;
