import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    borderBottom: "1px solid #4caf50",
    width: "100%",
    wordBreak: "break-all"
  },
  owner: {
    backgroundColor: "#00e676",
    color: "#311b92",
    padding: theme.spacing.unit,
    borderRadius: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  otherUser: {
    backgroundColor: "#6200ea",
    color: "white",
    padding: theme.spacing.unit,
    borderRadius: theme.spacing.unit
  },
  message: {
    display: "inline-block",
    textAlign: "left"
  },
  avatar: {
    display: "inline-block"
  }
});

const Message = ({ message, auth, classes }) => {
  const usernameColor =
    auth.user.username === message.username ? classes.owner : classes.otherUser;
  return (
    <Grid
      container
      justify="flex-start"
      alignItems="center"
      className={classes.root}
    >
      <Avatar
        className={classes.avatar}
        src={auth.user.avatar}
        alt={auth.user.username}
        title="You must have a Gravatar connected to your email to display an image"
      />
      <div className={classes.message}>
        <span className={usernameColor}>{message.username}</span>
      </div>
      <div className={classes.message}>{message.text}</div>
    </Grid>
  );
};

export default withStyles(styles)(Message);
