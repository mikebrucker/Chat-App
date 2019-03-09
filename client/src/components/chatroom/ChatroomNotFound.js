import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    textAlign: "center",
    marginTop: theme.spacing.unit * 3
  },
  appBar: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

const ChatroomNotFound = props => {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <h1>Chatroom Does not Exist</h1>
    </div>
  );
};

export default withStyles(styles)(ChatroomNotFound);
