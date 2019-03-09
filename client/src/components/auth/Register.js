import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/authActions";
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
    paddingTop: theme.spacing.unit * 2
  },
  errorMessage: {
    color: "red"
  }
});

class Register extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
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
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log(userData);
    this.props.registerUser(userData, this.props.history);
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
              placeholder="Name"
              name="name"
              type="name"
              variant="outlined"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name ? true : false}
              autoFocus={true}
            />
            {errors.name ? (
              <div className={classes.errorMessage}>{errors.name}</div>
            ) : null}
          </div>

          <div>
            <TextField
              className={classes.textField}
              placeholder="Username"
              name="username"
              type="username"
              variant="outlined"
              value={this.state.username}
              onChange={this.onChange}
              error={errors.username ? true : false}
            />
            {errors.username ? (
              <div className={classes.errorMessage}>{errors.username}</div>
            ) : null}
          </div>

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

          <div>
            <TextField
              className={classes.textField}
              placeholder="Confirm Password"
              name="password2"
              type="password"
              variant="outlined"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2 ? true : false}
            />
            {errors.password2 ? (
              <div className={classes.errorMessage}>{errors.password2}</div>
            ) : null}
          </div>

          <div className={classes.button}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              display={{ display: "block" }}
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  registerUser: (creds, hist) => dispatch(registerUser(creds, hist))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Register));
