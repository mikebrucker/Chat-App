import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/authActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    textAlign: "center",
    paddingTop: theme.spacing.unit * 6
  },
  textField: {
    width: "100%",
    maxWidth: "320px",
    padding: theme.spacing.unit
  },
  button: {
    paddingTop: theme.spacing.unit
  },
  errorMessage: {
    color: "red",
    paddingBottom: theme.spacing.unit
  }
});

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  // If logged in redirect to dashboard
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        ...this.state,
        errors: nextProps.errors
      });
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(userData);
    this.props.loginUser(userData);
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;

    return (
      <div className={classes.root}>
        <form onSubmit={this.onSubmit}>
          <div>
            <TextField
              className={classes.textField}
              placeholder="Email Address"
              name="email"
              type="email"
              variant="outlined"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email ? true : false}
              autoFocus={true}
            />
            {errors.email ? (
              <div className={classes.errorMessage}>{errors.email}</div>
            ) : null}
          </div>

          <div>
            <TextField
              className={classes.textField}
              placeholder="Password"
              name="password"
              type="password"
              variant="outlined"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password ? true : false}
            />
            {errors.password ? (
              <div className={classes.errorMessage}>{errors.password}</div>
            ) : null}
          </div>
          <div className={classes.button}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              display={{ display: "block" }}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  loginUser: creds => dispatch(loginUser(creds))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
