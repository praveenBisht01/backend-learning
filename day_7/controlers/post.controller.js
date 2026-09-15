const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function Create_post_controller(req, res) {
  console.log(req.body, req.file);

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      Message: "token not provided, Unauthorized access",
    });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      Message: "User is not authorised",
    });
  }

  console.log("Decoded:", decoded);

  const file = await imagekit.files.upload({
    file: req.file.buffer.toString("base64"),
    fileName: "test.jpg",
    folder: "insta_clone",
  });

  console.log("IMAGEKIT RESPONSE:", file);

  const post = await postModel.create({
    caption: req.body.caption,
    imgURL: file.url,
    user: decoded.id,
  });

  res.status(201).json({
    Message: "post created successfully",
    post,
  });
}

async function GetPostController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      Message: "token not provided",
    });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      Message: "token invalid",
    });
  }

  const User_ID = decoded.id;

  const post = await postModel.find({
    user: User_ID,
  });

  res.status(200).json({
    Message: "Post fetched sucessfully",
    post,
  });
}

async function getPostDetails(req, res) {

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      Message: "unAuthorized Access",
    });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      Message: "Invalid Token",
    });
  }

  const User_ID = decoded.id;
  const PostID = req.params.postId;

  const post = await postModel.findById(PostID);

  if (!post) {
    return res.status(404).json({
      Message: "post not found"
    });
  }

  const isVailed_user = post.user.toString() === User_ID;

  if (!isVailed_user) {
    return res.status(403).json({
      Message: "Forbidden content"
    });
  }

  return res.status(200).json({
    Message: "post Fetched successfully",
    post
  });
}


module.exports = {
  Create_post_controller,
  GetPostController,
  getPostDetails
};
