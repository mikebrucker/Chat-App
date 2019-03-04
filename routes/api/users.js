const express = require("express");
const router = express.Router();

// @route 	GET api/users/test
// @desc 		tests users route
// @access 	PUBLIC
router.get("/test", (req, res) => res.json({ test: "users route success" }));

module.exports = router;
