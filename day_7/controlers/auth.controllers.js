const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
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
        isUSERalreadyExist.email == email
          ? "Email already Exist"
          : "username already exits",
    });
  }

  const hash = await bcrypt.hash(password, 10);

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
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  const user = await UserModel.findOne({
    $or: [
      {
        username: username,
      },
      {
        email: email,
      },
    ],
  });

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const is_password_valid = await bcrypt.compare(password, user.password);

  if (!is_password_valid) {
    return res.status(401).json({
      message: "password is invalid",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.status(200).json({
    message: "user logged-in seccessfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}



module.exports = {
  registerController,
  loginController,
};
