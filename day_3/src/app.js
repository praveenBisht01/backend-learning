const express = require("express")
const app = express();

const cookieparser = require("cookie-parser");

app.use(express.json());
app.use(cookieparser());


const authRouter = require("../routes/auth.routes")
app.use("/api/auth", authRouter)


module.exports = app

