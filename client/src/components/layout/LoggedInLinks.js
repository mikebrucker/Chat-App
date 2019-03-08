import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../../store/actions/authActions";

import IconButton from "@material-ui/core/IconButton";
import Eject from "@material-ui/icons/Eject";

const LoggedInLinks = props => {
  const signOut = () => {
    props.logoutUser(props.history);
  };

  return (
    <div>
      <IconButton onClick={signOut} color="inherit">
        Log Out
        <Eject />
      </IconButton>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  logoutUser: history => dispatch(logoutUser(history))
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter(LoggedInLinks));
