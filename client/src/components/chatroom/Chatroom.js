import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  getChatroomByName,
  addChatroom,
  addMessage
} from "../../store/actions/chatroomActions";
import {
  favoriteThisChatroom,
  unFavoriteThisChatroom
} from "../../store/actions/authActions";
import Messages from "./Messages";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";

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
  container: {
    textAlign: "left",
    margin: "auto",
    maxWidth: "756px",
    padding: theme.spacing.unit * 2,
    height: "512px",
    overflow: "auto"
  },
  containerContainer: {
    display: "inline-block",
    border: "2px solid green",
    borderRadius: "12px",
    padding: theme.spacing.unit * 2
  },
  form: {
    textAlign: "center"
  },
  errorMessage: {
    color: "red",
    paddingBottom: theme.spacing.unit
  },
  input: {
    margin: theme.spacing.unit
  }
});

class Chatroom extends Component {
  state = {
    text: "",
    errors: {}
  };

  componentDidMount() {
    this.props.getChatroomByName(this.props.match.params.chatroom);
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newMessage = {
      text: this.state.text,
      name: this.props.auth.user.name,
      username: this.props.auth.user.username,
      avatar: this.props.auth.user.avatar
    };

    this.props.addMessage(newMessage, this.props.chatroom.chatroom.name);
    this.setState({
      text: ""
    });
  };

  clickCreateChatroom = () => {
    const chatroomName = {
      name: this.props.match.params.chatroom
    };
    this.props.addChatroom(chatroomName);
  };

  favOrUnFavThisChatroom = () => {
    const myFavorite = {
      name: this.props.match.params.chatroom
    };
    if (
      this.props.auth &&
      this.props.auth.user.favorites.filter(fav => {
        return fav.name === this.props.chatroom.chatroom.name;
      }).length > 0
    ) {
      console.log("unfav");
      this.props.unFavoriteThisChatroom(myFavorite);
    } else {
      console.log("fav");
      this.props.favoriteThisChatroom(myFavorite);
    }
  };

  render() {
    const { auth, classes, chatroom } = this.props;
    const { errors } = this.state;
    if (!auth.isAuthenticated) return <Redirect to="/login" />;

    const isFavorite =
      auth &&
      chatroom &&
      auth.user.favorites.filter(fav => {
        return fav.name === chatroom.chatroom.name;
      }).length > 0 ? (
        <Favorite />
      ) : (
        <FavoriteBorder />
      );

    const showChatroom =
      chatroom && chatroom.chatroom ? (
        <div>
          <h1>
            <Button onClick={this.favOrUnFavThisChatroom} color="secondary">
              {isFavorite}
            </Button>
            Chatroom: {chatroom.chatroom.name}
          </h1>
          <div className={classes.containerContainer}>
            <div className={classes.container}>
              <Messages messages={chatroom.chatroom.messages} auth={auth} />
            </div>
          </div>
        </div>
      ) : chatroom && chatroom.chatroom === null ? (
        <div>
          <h1>Chatroom does not exist</h1>
          <p>Would you like to create it?</p>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={this.clickCreateChatroom}
          >
            Create {this.props.match.params.chatroom}
          </Button>
        </div>
      ) : (
        <div>Loading...</div>
      );
    const enterMessage =
      chatroom && chatroom.chatroom ? (
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.root}
          >
            <TextField
              className={classes.input}
              placeholder="Enter Message..."
              name="text"
              type="text"
              variant="outlined"
              value={this.state.text}
              onChange={this.onChange}
              error={errors.text ? true : false}
              autoFocus={true}
            />
            <Button type="submit" variant="contained" color="secondary">
              Send
            </Button>
          </Grid>
          {errors.text ? (
            <div className={classes.errorMessage}>{errors.text}</div>
          ) : null}
        </form>
      ) : null;

    return (
      <div className={classes.root}>
        {showChatroom}
        {enterMessage}
      </div>
    );
  }
}

Chatroom.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  getChatroomByName: PropTypes.func.isRequired,
  addChatroom: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  favoriteThisChatroom: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  chatroom: state.chatroom,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  getChatroomByName: name => dispatch(getChatroomByName(name)),
  addMessage: (data, chatroomname) => dispatch(addMessage(data, chatroomname)),
  addChatroom: data => dispatch(addChatroom(data)),
  favoriteThisChatroom: chatroomname =>
    dispatch(favoriteThisChatroom(chatroomname)),
  unFavoriteThisChatroom: chatroomname =>
    dispatch(unFavoriteThisChatroom(chatroomname))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Chatroom));
