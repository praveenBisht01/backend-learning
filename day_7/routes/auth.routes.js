const express = require("express");
const UserModel = require("../models/user.model");
const authRouter = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

authRouter.post(`/register`, async (req, res) => {
  const { email, username, password, bio, profileImage } = req.body;

//   const isUser_exist_byEmail = await UserModel.findOne({ email });

//   if (isUser_exist_byEmail) {
//     return res.status(409).json({
//       message: "user is already exist with same email address",
//     });
//   }

//   const isUser_exist_byUsername = await UserModel.findOne({ username });

//   if (isUser_exist_byUsername) {
//     return res.status(409).json({
//       message: "user is exist by this Username",
//     });
//   }

  const isUSERalreadyExist = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUSERalreadyExist) {
    return res.status(409).json({
      message:
        (isUSERalreadyExist.email == email
          ? "Email already Exist"
          : "username already exits"),
    });
  }

  const hash = crypto.createHash(`sha256`).update(password).digest("hex");

  const user = await UserModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      email: user.email,
      Username: user.usrename,
      Bio: user.bio,
      profileImage: user.profileImage,
    },
  });
});

module.exports = authRouter;
