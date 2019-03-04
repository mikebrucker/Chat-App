const express = require("express");
const router = express.Router();

// @route 	GET api/chatroom/test
// @desc 		tests chatroom route
// @access 	PUBLIC
router.get("/test", (req, res) => res.json({ test: "chatroom route success" }));

module.exports = router;
