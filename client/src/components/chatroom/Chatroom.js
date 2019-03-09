import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { getChatroomByName } from "../../store/actions/chatroomActions";

const styles = theme => ({
  root: {
    width: "100%",
    textAlign: "center",
    paddingTop: theme.spacing.unit * 6
  }
});

class Chatroom extends Component {
  state = {
    message: ""
  };

  componentDidMount() {
    this.props.getChatroomByName(this.props.match.params.chatroom);
  }

  getChatroom = () => {
    this.props.getChatroomByName(this.props.match.params.chatroom);
  };

  redirectToLogin = () => {
    this.props.history.push("/login");
  };

  render() {
    const { auth, classes, chatroom } = this.props;

    if (!auth.isAuthenticated) {
      this.redirectToLogin();
    }

    if (chatroom && chatroom.chatroom && !chatroom.loading) {
      if (this.props.match.params.chatroom !== chatroom.chatroom.name) {
        this.getChatroom();
      }
    } else if (!chatroom.chatroom && !chatroom.loading) {
      if (this.props.match.params.chatroom !== chatroom.prevSearch) {
        this.getChatroom();
      }
      console.log("not found");
    }

    const showChatroom =
      chatroom && chatroom.chatroom ? (
        <div>
          <h1>Chatroom: {chatroom.chatroom.name}</h1>
        </div>
      ) : chatroom && chatroom.chatroom === null ? (
        <h1>Chatroom does not exist</h1>
      ) : (
        <div>Loading...</div>
      );

    return <div className={classes.root}>{showChatroom}</div>;
  }
}

Chatroom.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  getChatroomByName: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  chatroom: state.chatroom
});

const mapDispatchToProps = dispatch => ({
  getChatroomByName: name => dispatch(getChatroomByName(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Chatroom));
