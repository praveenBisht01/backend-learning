const express = require("express");
const app = require("../src/app");
const Usermodel = require("../models/Database.model");
const AuthRouter = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

AuthRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExist = await Usermodel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      Message: "user is already exist",
    });
  }

  const user = await Usermodel.create({
    name,
    email,
    password: crypto.createHash("sha256").update(password).digest("hex"),
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("TOKEN", token);

  res.status(201).json({
    Message: "user register successfully",
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  });
});

AuthRouter.get("/get-me", async (req, res) => {
  const token = req.cookies.TOKEN;

  if (!token) {
    return res.status(401).json({
      Message: "Please login first",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decode);

    const user = await Usermodel.findById(decode.id);

    if (!user) {
      return res.status(404).json({
        Message: "User not found",
      });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res.status(401).json({
      Message: "Invalid or expired token",
    });
  }
});

AuthRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await Usermodel.findOne({ email })
    
    if (!user) {
        return res.status(404).json({
            Message: "user not found "
        })
    }
    const hash = crypto.createHash("sha256").update(password).digest(`hex`);

    const is_passwordVailed = hash === user.password
    
    if (!is_passwordVailed) {
        return res.status(401).json({
            Message:"ibvailed password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, { expiresIn: "1h" })  
    
    res.cookie("token", token)
    

    res.json({
        Message: "user logged successfully",
        user: {
            name: user.name,
            email:user.email,
        }
    })
})

module.exports = AuthRouter;
