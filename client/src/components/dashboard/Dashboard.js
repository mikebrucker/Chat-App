import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Dashboard extends Component {
  render() {
    const { auth } = this.props;

    if (!auth.isAuthenticated) {
      this.props.history.push("/login");
    }

    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
