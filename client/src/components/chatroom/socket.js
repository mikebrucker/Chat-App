import io from "socket.io-client";
// import { getChatroomByName } from "../../store/actions/chatroomActions";

export const socket = () => {
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

  function recieveMessage(onRecieveMessage) {
    socket.on("recieveMessage", onRecieveMessage);
    console.log("client, onRecieveMessage");
  }

  function join(chatroomName, cb) {
    socket.emit("join", chatroomName, cb);
  }

  function leave(chatroomName, cb) {
    socket.emit("leave", chatroomName, cb);
  }

  function message(chatroomName, msg) {
    socket.emit("sendMessage", chatroomName, msg);
  }

  function getChatrooms(cb) {
    socket.emit("chatrooms", null, cb);
  }

  return {
    join,
    leave,
    message,
    getChatrooms,
    recieveMessage
  };
};
