const express = require("express");
const userModel = require("../model/db_model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const isUserisAlreadyexist = await userModel.findOne({ email });

  if (isUserisAlreadyexist) {
    return res.status(400).json({
      massage: "user already exist with this email address ",
    });
  }

  const user = await userModel.create({
    email,
    password,
    name,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User registered successfully",
    user,
    token,
  });
});

authRouter.post("/protected", (req, res) => {
    console.log(req.cookies);
    res.status(200).json({
        message:"this is a protected routes"
    })
})



module.exports = authRouter;
