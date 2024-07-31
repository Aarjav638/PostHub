const postSchema = require("../models/postModel");

const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;

    //validation

    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    console.log(req);
    const post = new postSchema({
      title,
      description,
      postedBy: req.auth._id,
    });

    const savedPost = await post.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      savedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: "Internal server error",
      error,
    });
  }
};

//get post of a single user

const getUserPostsController = async (req, res) => {
  try {
    const posts = await postSchema
      .find({ postedBy: req.auth._id })
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message:
        "Posts fetched successfully for the user with id " + req.auth._id,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

// get all posts

const getAllPostsController = async (req, res) => {
  try {
    const posts = await postSchema
      .find()
      .populate("postedBy", "_id name email")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

//delete post of a user

const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postSchema.findOne({ _id: id });

    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }

    await postSchema.findOneAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

// update post controller

const updatePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const existingpost = await postSchema.findById({ _id: id });

    if (!existingpost) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }

    if (!title && !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill atleast one field to update",
      });
    }

    const updatedPost = await postSchema.findOneAndUpdate(
      { _id: id },
      {
        title: title || existingpost.title,
        description: description || existingpost.description,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

module.exports = {
  createPostController,
  deletePostController,
  getUserPostsController,
  getAllPostsController,
  updatePostController,
};
