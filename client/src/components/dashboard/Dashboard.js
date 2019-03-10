import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    width: "100%",
    textAlign: "center",
    paddingTop: theme.spacing.unit * 6
  },
  avatar: {
    display: "inline-block"
  }
});

class Dashboard extends Component {
  render() {
    const { auth, classes } = this.props;

    if (!auth.isAuthenticated) return <Redirect to="/login" />;

    const displayUser =
      auth && auth.user ? (
        <div>
          <h1>
            Welcome {auth.user.name}{" "}
            <Avatar
              className={classes.avatar}
              src={auth.user.avatar}
              alt={auth.user.username}
              title="You must have a Gravatar connected to your email to display an image"
            />
          </h1>
          <h3>username: {auth.user.username}</h3>
          <h3>email: {auth.user.email}</h3>
        </div>
      ) : (
        <div>Loading...</div>
      );

    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        {displayUser}
      </Grid>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
