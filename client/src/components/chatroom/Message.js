import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    border: "solid black",
    borderWidth: "1px 2px 1px 2px",
    width: "100%"
  },
  owner: {
    backgroundColor: "green",
    color: "white",
    padding: theme.spacing.unit,
    borderRadius: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  otherUser: {
    backgroundColor: "purple",
    color: "white",
    padding: theme.spacing.unit,
    borderRadius: theme.spacing.unit
  },
  message: {
    wordBreak: "break-all",
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
