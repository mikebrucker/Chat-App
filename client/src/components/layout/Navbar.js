import React, { Component } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../../store/actions/authActions";
import {
  getChatroomByName,
  getChatrooms
} from "../../store/actions/chatroomActions";
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from "./LoggedOutLInks";

import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

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
      width: 300
    }
  },
  form: {
    width: "auto"
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
  },
  list: {
    width: 250
  }
});

class Navbar extends Component {
  state = {
    chatroom: "",
    anchorEl: null,
    left: false
  };

  componentDidMount() {
    this.props.getChatrooms();
  }

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

  goToChatroomFromSideMenu = room => {
    if (this.props.auth && this.props.auth.isAuthenticated) {
      this.props.getChatroomByName(room);
      this.props.history.push(`/chatroom/${room}`);
    }
    this.setState({
      chatroom: ""
    });
  };

  toggleDrawer = () => {
    this.props.getChatrooms();
    this.setState({
      left: !this.state.left
    });
  };

  handleMoreOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMoreClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, auth, chatroom } = this.props;
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    const links =
      auth && auth.isAuthenticated ? (
        <LoggedInLinks />
      ) : (
        <LoggedOutLinks
          handleMoreClose={this.handleMoreClose}
          isMenuOpen={isMenuOpen}
        />
      );

    const mobileLinks = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMoreClose}
      >
        {links}
      </Menu>
    );

    const sideMenu = (
      <div className={classes.list}>
        <ListSubheader>All Chatrooms</ListSubheader>
        <List>
          {auth &&
          auth.isAuthenticated &&
          chatroom &&
          chatroom.chatrooms.length > 0 ? (
            chatroom.chatrooms.map(room => (
              <ListItem
                button
                key={room._id}
                onClick={this.goToChatroomFromSideMenu.bind(this, room.name)}
              >
                <ListItemText primary={room.name} />
              </ListItem>
            ))
          ) : (
            <div>Log In To See!</div>
          )}
        </List>
      </div>
    );

    return (
      <nav className={classes.root}>
        <AppBar color="primary" position="static">
          <Toolbar>
            <IconButton
              onClick={this.toggleDrawer}
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
            <form className={classes.form} onSubmit={this.goToChatroom}>
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
            <div className={classes.sectionDesktop}>{links}</div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMoreOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {mobileLinks}
        <Drawer open={this.state.left} onClose={this.toggleDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >
            {sideMenu}
          </div>
        </Drawer>
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  getChatroomByName: PropTypes.func.isRequired,
  getChatrooms: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  chatroom: state.chatroom
});

const mapDispatchToProps = dispatch => ({
  loginUser: () => dispatch(loginUser()),
  logoutUser: history => dispatch(logoutUser(history)),
  getChatroomByName: name => dispatch(getChatroomByName(name)),
  getChatrooms: () => dispatch(getChatrooms())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Navbar)));
