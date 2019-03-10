import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  getChatroomByName,
  addMessage
} from "../../store/actions/chatroomActions";
import Messages from "./Messages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
    border: "2px solid green",
    borderRadius: "12px",
    padding: theme.spacing.unit * 2,
    height: "512px",
    overflow: "auto"
  },
  errorMessage: {
    color: "red",
    paddingBottom: theme.spacing.unit
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
    console.log(this.state);
  };

  render() {
    const { auth, classes, chatroom } = this.props;
    const { errors } = this.state;
    if (!auth.isAuthenticated) return <Redirect to="/login" />;

    const showChatroom =
      chatroom && chatroom.chatroom ? (
        <div>
          <h1>Chatroom: {chatroom.chatroom.name}</h1>
          <div className={classes.container}>
            <Messages messages={chatroom.chatroom.messages} auth={auth} />
          </div>
        </div>
      ) : chatroom && chatroom.chatroom === null ? (
        <h1>Chatroom does not exist</h1>
      ) : (
        <div>Loading...</div>
      );
    const enterMessage =
      chatroom && chatroom.chatroom ? (
        <div>
          <TextField
            placeholder="Enter Message..."
            name="text"
            type="text"
            variant="outlined"
            value={this.state.text}
            onChange={this.onChange}
            error={errors.text ? true : false}
            autoFocus={true}
          />
          <Button
            onClick={this.handleSubmit}
            type="submit"
            variant="contained"
            color="secondary"
          >
            Send
          </Button>
          {errors.text ? (
            <div className={classes.errorMessage}>{errors.text}</div>
          ) : null}
        </div>
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
  addMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  chatroom: state.chatroom,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  getChatroomByName: name => dispatch(getChatroomByName(name)),
  addMessage: (data, chatroomname) => dispatch(addMessage(data, chatroomname))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Chatroom));
