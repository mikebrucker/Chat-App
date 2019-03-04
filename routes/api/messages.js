const express = require("express");
const router = express.Router();

// @route 	GET api/messages/test
// @desc 		tests messages route
// @access 	PUBLIC
router.get("/test", (req, res) => res.json({ test: "messages route success" }));

module.exports = router;
