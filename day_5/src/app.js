const express = require("express")
const app = express();
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const AuthRouter = require("../Routes/Auth.routes")


app.use(express.json()); 
app.use(cookieparser());
app.use("/api/auth", AuthRouter);  







module.exports = app;