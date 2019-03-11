const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ChatroomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  messages: [
    {
      text: {
        type: String,
        max: 2000,
        required: true
      },
      userId: {
        type: String
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
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Chatroom = mongoose.model("chatrooms", ChatroomSchema);
