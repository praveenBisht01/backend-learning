const express = require("express");
const authRouter = express.Router();

const {
  registerController,
  loginController,
} = require("../controlers/auth.controllers");

authRouter.post("/register", registerController);

authRouter.post("/login", loginController);

module.exports = authRouter;
