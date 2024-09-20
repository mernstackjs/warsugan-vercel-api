const { Router } = require("express");

const router = Router();

router.use("/posts", require("./api/post"));

module.exports = router;
