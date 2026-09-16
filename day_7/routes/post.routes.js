const express = require("express");
const postRouter = express.Router();
const postControllers = require("../controlers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identify_user = require("../middlewares/auth.middlewares")


postRouter.post("/",upload.single("image"),postControllers.Create_post_controller)

postRouter.get("/",identify_user,postControllers.GetPostController)


postRouter.get("/details/:postId",identify_user ,postControllers.getPostDetails)

module.exports = postRouter;