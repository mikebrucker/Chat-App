import React from "react";
import AppBar from "@material-ui/core/AppBar";
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

const Footer = props => {
  const classes = props.classes;
  return (
    <footer className={classes.root}>
      <AppBar className={classes.appBar} color="primary" position="static">
        Copyright &copy; {new Date().getFullYear()} Chat App
      </AppBar>
    </footer>
  );
};

export default withStyles(styles)(Footer);
