const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  chatroom: {
    type: Schema.Types.ObjectId,
    ref: "chatrooms"
  },
  text: {
    type: String,
    max: 2000,
    required: true
  },
  name: {
    type: String
  },
  username: {
    type: String
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Message = mongoose.model("message", MessageSchema);
