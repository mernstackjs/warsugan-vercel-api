const { Router } = require("express");
const { createPost, allPosts, singlePost } = require("../../controller/post");

const router = Router();

router.post("/new", createPost);
router.get("/", allPosts);
router.get("/:postid", singlePost);

module.exports = router;
