import React from "react";
import Message from "./Message";

const Messages = ({ messages, auth }) => {
  const displayMessages =
    messages && messages.length > 0 ? (
      messages.map(message => {
        return <Message key={message._id} message={message} auth={auth} />;
      })
    ) : (
      <h6>Be the first to chat</h6>
    );

  return <div>{displayMessages}</div>;
};

export default Messages;
