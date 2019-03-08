import React from "react";
import { withRouter } from "react-router-dom";

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

  return (
    <div>
      <IconButton onClick={toRegister} color="inherit">
        Register
        <RoomService />
      </IconButton>
      <IconButton onClick={toLogin} color="inherit">
        Log In
        <HowToReg />
      </IconButton>
    </div>
  );
};

export default withRouter(LoggedOutLinks);
