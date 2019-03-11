import React, { Component } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../../store/actions/authActions";
import { getChatroomByName } from "../../store/actions/chatroomActions";

import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from "./LoggedOutLInks";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    },
    display: "inline-block"
  },
  searchIcon: {
    width: theme.spacing.unit * 4,
    height: "100%"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    textAlign: "center",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  error: {
    textAlign: "center",
    backgroundColor: "red",
    fontColor: "white"
  },
  fontColor: {
    color: "white"
  }
});

class Navbar extends Component {
  state = {
    chatroom: "",
    errors: {}
  };

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

  goToChatroom = e => {
    e.preventDefault();
    if (this.props.auth && this.props.auth.isAuthenticated) {
      this.props.getChatroomByName(this.state.chatroom);
      this.props.history.push(`/chatroom/${this.state.chatroom}`);
    }
    this.setState({
      chatroom: ""
    });
  };

  render() {
    const { classes, auth } = this.props;
    const { errors } = this.state;

    const links =
      auth && auth.isAuthenticated ? <LoggedInLinks /> : <LoggedOutLinks />;

    return (
      <nav className={classes.root}>
        <AppBar color="primary" position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              <Link
                className={classes.fontColor}
                component={RouterLink}
                underline="none"
                to="/dashboard"
              >
                Chat App
              </Link>
            </Typography>
            <form onSubmit={this.goToChatroom}>
              <div className={classes.search}>
                <InputBase
                  name="chatroom"
                  onChange={this.onChange}
                  value={this.state.chatroom}
                  placeholder="Enter Chatroom..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
              </div>
              <IconButton
                type="submit"
                className={classes.searchIcon}
                onClick={this.goToChatroom}
              >
                <SearchIcon />
              </IconButton>
            </form>
            <div className={classes.grow} />
            <div
              classes={classnames(
                classes.sectionDesktop,
                classes.sectionMobile
              )}
            >
              {links}
            </div>
          </Toolbar>
        </AppBar>
        {errors && errors.nochatroom ? (
          <div className={classes.error}>{errors.nochatroom}</div>
        ) : null}
        <div />
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  getChatroomByName: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.chatroom.errors ? state.chatroom.errors : {}
});

const mapDispatchToProps = dispatch => ({
  loginUser: () => dispatch(loginUser()),
  logoutUser: history => dispatch(logoutUser(history)),
  getChatroomByName: name => dispatch(getChatroomByName(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Navbar)));
