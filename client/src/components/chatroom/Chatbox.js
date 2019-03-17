import React from "react";
import Messages from "./Messages";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  chatBox: {
    textAlign: "left",
    margin: "auto",
    width: "80vw",
    padding: theme.spacing.unit * 2,
    height: "80vh",
    overflow: "auto",
    border: "4px solid #4caf50",
    borderRadius: "6px"
  }
});

const Chatbox = props => {
  const { messages, auth, classes } = props;
  return (
    <div className={classes.chatBox}>
      <Messages messages={messages} auth={auth} />
    </div>
  );
};

export default withStyles(styles)(Chatbox);
