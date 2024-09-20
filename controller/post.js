const Post = require("../model/post");

exports.createPost = async (req, res) => {
  try {
    const { title, desc } = req.body;
    if (!title || !desc)
      return res.status(404).json({
        success: false,
        message: "must fill all fields",
      });
    const post = await Post.create({ title, desc });

    res.status(201).json({
      success: true,
      message: "post is created",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error,
    });
  }
};

exports.allPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      success: true,
      message: "Post is here",
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error,
    });
  }
};
exports.singlePost = async (req, res) => {
  const { postid } = req.params;
  try {
    const post = await Post.findById(postid);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "dont find this post",
      });
    }
    res.status(200).json({
      success: true,
      message: "Post is here",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error,
    });
  }
};
