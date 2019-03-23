const io = require("socket.io-client");

export default function() {
  const socket = io("http://localhost:3000", {
    transport: ["websocket"]
  });

  socket.on("connect", function() {
    console.log("client connected");
  });
  socket.on("error", function(err) {
    console.log("received socket error:");
    console.log(err);
  });

  function join(chatroomName, cb) {
    socket.emit("join", chatroomName, cb);
  }

  function leave(chatroomName, cb) {
    socket.emit("leave", chatroomName, cb);
  }

  function message(chatroomName) {
    socket.emit("message", chatroomName);
  }

  function getChatrooms(cb) {
    socket.emit("chatrooms", null, cb);
  }

  return {
    join,
    leave,
    message,
    getChatrooms
  };
}
