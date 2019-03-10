import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    textAlign: "center",
    paddingTop: theme.spacing.unit * 6
  }
});

class Dashboard extends Component {
  render() {
    const { auth, classes } = this.props;

    if (!auth.isAuthenticated) return <Redirect to="/login" />;

    const displayUser =
      auth && auth.user ? (
        <div>
          <img
            className="rounded img-fluid"
            src={auth.user.avatar}
            alt={auth.user.username}
            style={{ width: "250px" }}
            title="You must have a Gravatar connected to your email to display an image"
          />

          <h1>Welcome {auth.user.name}</h1>
          <h3>username: {auth.user.username}</h3>
          <h3>email: {auth.user.email}</h3>
        </div>
      ) : (
        <div>Loading...</div>
      );

    return <div className={classes.root}>{displayUser}</div>;
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
