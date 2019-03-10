import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    textAlign: "center",
    paddingTop: theme.spacing.unit * 2
  },
  textField: {
    width: "100%",
    maxWidth: "900px",
    padding: theme.spacing.unit
  },
  owner: {
    backgroundColor: "green",
    color: "white"
  },
  otherUser: {
    backgroundColor: "purple",
    color: "white"
  }
});

const Message = ({ message, auth, classes }) => {
  const usernameColor =
    auth.user.username === message.username ? classes.owner : classes.otherUser;
  return (
    <div>
      <p>
        <span className={usernameColor}>{message.username}</span> {message.text}
      </p>
    </div>
  );
};

export default withStyles(styles)(Message);
