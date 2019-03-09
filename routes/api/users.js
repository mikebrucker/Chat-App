const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load User model
const User = require("../../models/User");

//Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route 	GET api/users/test
// @desc 		Tests user route
// @access 	Public Route
router.get("/test", (req, res) => res.json({ test: "users route success" }));

// @route 	POST api/users/register
// @desc 		Registers user
// @access 	Public Route
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  }).then(user => {
    if (user) {
      if (user.email === req.body.email) {
        errors.email = "Email Already Exists";
      }
      if (user.username === req.body.username) {
        errors.username = "Username Already Exists";
      }
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", // rating
        d: "mm" //default
      });

      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route 	POST api/users/login
// @desc 		Login user / Returning JWT Token
// @access 	Public Route
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({ email }).then(user => {
    // check for user
    if (!user) {
      errors.email = "User Not Found";
      return res.status(404).json(errors);
    }

    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user matched
        // create jwt payload
        const payload = {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          admin: user.admin
        };

        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 86400 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Incorrect Password";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route 	GET api/users/current
// @desc 		Return current user
// @access 	Private Route
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      username: req.user.username,
      email: req.user.email
    });
  }
);

// @route 	DELETE api/users/:id
// @desc 		delete user
// @access 	Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    if (req.params.id === req.user.id) {
      User.findOneAndDelete(req.params.id)
        .then(user => {
          res.json({
            success: `${user.username} Deleted`
          });
        })
        .catch(err => res.status(404).json(err));
    } else {
      errors.unauthorized = "Unauthorized";
      res.status(404).json(errors);
    }
  }
);

module.exports = router;
