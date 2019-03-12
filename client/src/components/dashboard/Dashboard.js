import React, { Component } from "react";
import { connect } from "react-redux";
import { Link as RouterLink, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { addChatroom } from "../../store/actions/chatroomActions";
import Moment from "react-moment";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

const styles = theme => ({
  root: {
    width: "100%",
    textAlign: "center",
    paddingTop: theme.spacing.unit * 2
  },
  avatar: {
    display: "inline-block"
  },
  form: {
    textAlign: "center"
  },
  errorMessage: {
    color: "red"
  },
  input: {
    margin: theme.spacing.unit
  }
});

class Dashboard extends Component {
  state = {
    chatroomname: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  clickCreateChatroom = e => {
    e.preventDefault();
    const chatroomName = {
      name: this.state.chatroomname
    };
    this.props.addChatroom(chatroomName);
    this.setState({
      chatroomname: ""
    });
    this.props.history.push(`/chatroom/${chatroomName.name}`);
  };

  render() {
    const { auth, classes, errors } = this.props;
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
          <h3>Username: {auth.user.username}</h3>
          <h3>Email: {auth.user.email}</h3>
          <h3>
            Member since{" "}
            <Moment format="MMMM Do, YYYY">{auth.user.date}</Moment>
          </h3>
          {auth.user.favorites.length > 0 ? (
            auth.user.favorites.map(fav => {
              return (
                <Link
                  color="secondary"
                  component={RouterLink}
                  underline="none"
                  to={`/chatroom/${fav.name}`}
                >
                  <h4 key={fav._id}>{fav.name}</h4>
                </Link>
              );
            })
          ) : (
            <h4>No Favorites Added Yet</h4>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      );

    const chatroomForm = (
      <form className={classes.form} onSubmit={this.clickCreateChatroom}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <TextField
            className={classes.input}
            placeholder="New Chatroom..."
            name="chatroomname"
            type="text"
            variant="outlined"
            value={this.state.chatroomname}
            onChange={this.onChange}
            error={errors.name ? true : false}
            autoFocus={true}
          />
          <Button type="submit" variant="contained" color="secondary">
            Create
          </Button>
        </Grid>
        {errors.name ? (
          <div className={classes.errorMessage}>{errors.name}</div>
        ) : null}
      </form>
    );

    return (
      <div>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          {displayUser}
        </Grid>
        {chatroomForm}
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  addChatroom: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  addChatroom: data => dispatch(addChatroom(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));
