const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Chatroom Model
const Chatroom = require("../../models/Chatroom");
// Message Model
const Message = require("../../models/Message");

// Validation
const validateMessagesInput = require("../../validation/create-message");

// @route 	GET api/messages/test
// @desc 		tests messages route
// @access 	PUBLIC
router.get("/test", (req, res) => res.json({ test: "messages route success" }));

// @route 	POST api/messages/:chatroomname
// @desc 		Create Message in a chatroom
// @access 	Private
router.post(
  "/:chatroomname",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMessagesInput(req.body);

    // Check Validation
    if (!isValid) {
      // if errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    Chatroom.findOne({ name: req.params.chatroomname }).then(chatroom => {
      if (!chatroom) {
        errors.nochatroom = "No Chatroom Exists With That Name";
        res.status(404).json(errors);
      } else {
        const newMessage = new Message({
          text: req.body.text,
          name: req.body.name,
          username: req.body.username,
          avatar: req.body.avatar,
          user: req.user.id,
          chatroom: chatroom.id
        });

        newMessage.save().then(message => res.json(message));
      }
    });
  }
);

module.exports = router;
