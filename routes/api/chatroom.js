const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Chatroom model
const Chatroom = require("../../models/Chatroom");

// Validation
const validateChatroomInput = require("../../validation/create-chatroom");
const validateMessageInput = require("../../validation/create-message");

// @route 	GET api/chatroom/test
// @desc 		tests chatroom route
// @access 	PUBLIC
router.get("/test", (req, res) => res.json({ test: "chatroom route success" }));

// @route 	GET api/chatroom/id/:id
// @desc 		Get chatroom by id
// @access 	Private
router.get(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Chatroom.findById(req.params.id)
      .then(chatroom => {
        if (!chatroom) {
          errors.nochatroom = "No Chatroom Exists With That ID";
          res.status(404).json(errors);
        }

        res.json(chatroom);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route 	GET api/chatroom/:name
// @desc 		Get chatroom by name
// @access 	Private
router.get(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Chatroom.findOne({ name: req.params.name })
      .then(chatroom => {
        if (!chatroom) {
          errors.nochatroom = "No Chatroom Exists With That Name";
          res.status(404).json(errors);
        }

        res.json(chatroom);
      })
      .catch(err => res.status(404).json(err));
  }
);

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

// @route 	POST api/chatroom/message/:chatroomname
// @desc 		Create Message in a chatroom
// @access 	Private
router.post(
  "/message/:chatroomname",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMessageInput(req.body);

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
        const newMessage = {
          text: req.body.text,
          name: req.body.name,
          username: req.body.username,
          avatar: req.body.avatar,
          user: req.user.id
        };

        chatroom.messages.unshift(newMessage);
        chatroom.save().then(chatroom => res.json(chatroom));
      }
    });
  }
);

// @route 	DELETE api/chatroom/:id
// @desc 		delete chatroom by admin
// @access 	Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Chatroom.findById(req.params.id)
      .then(chatroom => {
        // Check to see if chatroom exists and user is admin
        if (chatroom && req.user.admin) {
          // Delete chatroom
          chatroom.remove().then(() => res.json({ success: true }));
        } else if (!chatroom) {
          errors.nochatroom = "No Chatroom Exists With That ID";
          res.status(404).json(errors);
        } else if (!req.user.admin) {
          errors.unauthorized =
            "You are not authorized to delete this chatroom";
          res.status(404).json(errors);
        }
      })
      .catch(err =>
        res.status(404).json({ chatroomnotfound: "No chatroom Found" })
      );
  }
);

module.exports = router;
