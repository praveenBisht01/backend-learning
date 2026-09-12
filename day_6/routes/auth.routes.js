const express = require("express");
const UserModel = require("../models/user_model");
const jwt = require("jsonwebtoken");
const authrouter = express.Router();
const crypto = require("crypto");

authroutr.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const IsUserIsAlreadyExist = await UserModel.findOne({ email });
  if (IsUserIsAlreadyExist) {
    return res.status(409).json({
      Message: "user with this email is already exist",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const user = await UserModel.create({
    email,
    password: hash,
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

  res.status(201).json({
    Message: "user registered",
    user,
    token,
  });
});

authroutr.post("/protected", (req, res) => {
  console.log(req.cookies);

  res.status(200).json({
    Message: "thid id a protected route",
  });
});
authroutr.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      Message: " User not found with thid email eddress",
    });
  }

  const IsPasswordMatch =
    user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!IsPasswordMatch) {
    return res.status(401).json({
      Message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(200).json({
    Message: "user logged in successfully",
    user,
    token,
  });
});

module.exports = authroutr;
