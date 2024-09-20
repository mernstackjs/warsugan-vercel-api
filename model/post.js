const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  title: String,
  desc: String,
});

const Post = model("Post", postSchema);

module.exports = Post;
