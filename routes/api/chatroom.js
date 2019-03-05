const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load models
const Chatroom = require("../../models/Chatroom");
const Message = require("../../models/Message");

// Validation
const validateChatroomInput = require("../../validation/create-chatroom");

// @route 	GET api/chatroom/test
// @desc 		tests chatroom route
// @access 	PUBLIC
router.get("/test", (req, res) => res.json({ test: "chatroom route success" }));

// @route 	GET api/chatroom/id/:id
// @desc 		Get chatroom by id
// @access 	Public
router.get("/id/:id", (req, res) => {
  const errors = {};
  const myChatroom = {};

  Chatroom.findById(req.params.id)
    .then(chatroom => {
      if (!chatroom) {
        errors.nochatroom = "No Chatroom Exists With That ID";
        res.status(404).json(errors);
      }
      myChatroom.chatroom = chatroom;

      Message.find({ chatroom: chatroom._id })
        .sort({ date: -1 })
        .then(feed => {
          myChatroom.messages = feed;
          res.json(myChatroom);
        })
        .catch(err => res.status(404).json(err));
    })
    .catch(err => res.status(404).json(err));
});

// @route 	GET api/chatroom/:name
// @desc 		Get chatroom by name
// @access 	Public
router.get("/:name", (req, res) => {
  const errors = {};
  const myChatroom = {};

  Chatroom.findOne({ name: req.params.name })
    .then(chatroom => {
      if (!chatroom) {
        errors.nochatroom = "No Chatroom Exists With That Name";
        res.status(404).json(errors);
      }
      myChatroom.chatroom = chatroom;

      Message.find({ chatroom: chatroom._id })
        .sort({ date: -1 })
        .then(feed => {
          myChatroom.messages = feed;
          res.json(myChatroom);
        })
        .catch(err => res.status(404).json(err));
    })
    .catch(err => res.status(404).json(err));
});

// @route 	POST api/chatroom
// @desc 		Create Chatroom
// @access 	Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateChatroomInput(req.body);

    // Check Validation
    if (!isValid) {
      // if errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Chatroom.findOne({ name: req.body.name }).then(chatroom => {
      if (chatroom) {
        errors.name = "Chatroom Name Already Exists";
        return res.status(400).json(errors);
      } else {
        const newChatroom = new Chatroom({
          name: req.body.name
        });

        newChatroom.save().then(chatroom => res.json(chatroom));
      }
    });
  }
);

module.exports = router;
