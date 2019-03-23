import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getChatroomByName,
  addChatroom,
  addMessage,
  getChatrooms
} from "../../store/actions/chatroomActions";
import {
  favoriteThisChatroom,
  unFavoriteThisChatroom
} from "../../store/actions/authActions";
import Chatbox from "./Chatbox";
import socket from "./socket";

import { withStyles } from "@material-ui/core/styles";
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
    padding: theme.spacing.unit
  },
  containerContainer: {
    width: "90vw",
    backgroundColor: "white",
    display: "inline-block",
    border: "4px solid #4caf50",
    borderRadius: "6px",
    textAlign: "left"
  },
  errorMessage: {
    color: "red",
    paddingBottom: theme.spacing.unit
  },
  input: {
    width: "55vw",
    margin: theme.spacing.unit
  }
});

class Chatroom extends Component {
  state = {
    client: socket(),
    user: "",
    chatroom: "",
    text: "",
    errors: {}
  };

  componentDidMount() {
    this.props.getChatroomByName(this.props.match.params.chatroom);
    this.props.getChatrooms();
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.chatroom && nextProps.chatroom.chatroom) {
      this.setState({
        chatroom: nextProps.chatroom.chatroom.name
      });
    }
    if (nextProps.auth && nextProps.auth.user) {
      this.setState({
        user: nextProps.auth.user.username
      });
    }
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
    if (this.state.chatroom === this.props.chatroom.chatroom.name) {
      this.props.addMessage(newMessage, this.props.chatroom.chatroom.name);
      this.state.client.message(this.state.chatroom);
    }
    console.log(this.state);
    this.setState({
      text: ""
    });
  };

  clickCreateChatroom = () => {
    const chatroomName = {
      name: this.props.match.params.chatroom
    };
    this.props.addChatroom(chatroomName);
    this.props.getChatrooms();
  };

  favOrUnFavThisChatroom = () => {
    const myFavorite = {
      name: this.props.match.params.chatroom
    };
    if (
      this.props.auth &&
      this.props.chatroom &&
      this.props.auth.user.favorites.filter(fav => {
        return fav.name === this.props.chatroom.chatroom.name;
      }).length > 0
    ) {
      this.props.unFavoriteThisChatroom(myFavorite);
    } else {
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
      chatroom.chatroom &&
      auth.user.favorites.filter(fav => {
        return fav.name === chatroom.chatroom.name;
      }).length > 0 ? (
        <Favorite />
      ) : (
        <FavoriteBorder />
      );

    const enterMessage =
      chatroom && chatroom.chatroom ? (
        <form onSubmit={this.handleSubmit}>
          <Grid container justify="center" alignItems="center">
            <TextField
              className={classes.input}
              placeholder="Enter Message..."
              name="text"
              type="text"
              variant="outlined"
              multiline={true}
              rowsMax={20}
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

    const showChatroom =
      chatroom && chatroom.chatroom ? (
        <div>
          <div className={classes.containerContainer}>
            <h1>
              <Button onClick={this.favOrUnFavThisChatroom} color="secondary">
                {isFavorite}
              </Button>
              {chatroom.chatroom.name}
            </h1>
            <Chatbox messages={chatroom.chatroom.messages} auth={auth} />
            {enterMessage}
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

    return <div className={classes.root}>{showChatroom}</div>;
  }
}

Chatroom.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  getChatroomByName: PropTypes.func.isRequired,
  addChatroom: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  favoriteThisChatroom: PropTypes.func.isRequired,
  getChatrooms: PropTypes.func.isRequired
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
    dispatch(unFavoriteThisChatroom(chatroomname)),
  getChatrooms: () => dispatch(getChatrooms())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Chatroom));
