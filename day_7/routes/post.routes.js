const express = require("express");
const postRouter = express.Router();
const postControllers = require("../controlers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });


postRouter.post("/",upload.single("image"),postControllers.Create_post_controller)

postRouter.get("/",postControllers.GetPostController)


postRouter.get("/details/:postId", postControllers.getPostDetails)

module.exports = postRouter;