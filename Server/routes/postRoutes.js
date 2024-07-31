const experss = require("express");

const {
  getUserPostsController,
  createPostController,
  deletePostController,
  updatePostController,
  getAllPostsController,
} = require("../controllers/postController");
const { requireLogin } = require("../middleware");

const router = experss.Router();

//Create Post

router.post("/create-post", requireLogin, createPostController);

//Get user Posts

router.get("/get-posts", requireLogin, getUserPostsController);

//Get all posts

router.get("/get-all-posts", getAllPostsController);

//delete user post

router.delete("/delete-post/:id", requireLogin, deletePostController);

// update post

router.put("/update-post/:id", requireLogin, updatePostController);

module.exports = router;
