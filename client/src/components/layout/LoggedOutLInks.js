import React from "react";
import { withRouter } from "react-router-dom";

import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import RoomService from "@material-ui/icons/RoomService";
import HowToReg from "@material-ui/icons/HowToReg";

const LoggedOutLinks = props => {
  const toLogin = () => {
    props.history.push("/login");
  };

  const toRegister = () => {
    props.history.push("/register");
  };

  const register = (
    <IconButton onClick={toRegister} color="inherit">
      Register
      <RoomService />
    </IconButton>
  );

  const login = (
    <IconButton onClick={toLogin} color="inherit">
      Log In
      <HowToReg />
    </IconButton>
  );

  return props.isMenuOpen ? (
    <div>
      <MenuItem onClick={props.handleMoreClose}>{register}</MenuItem>
      <MenuItem onClick={props.handleMoreClose}>{login}</MenuItem>
    </div>
  ) : (
    <div>
      {register}
      {login}
    </div>
  );
};

export default withRouter(LoggedOutLinks);
