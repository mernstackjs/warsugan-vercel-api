const { Router } = require("express");

const router = Router();

router.use("/posts", require("./api/post"));
router.use("/", require("./api/reservation"));

module.exports = router;
