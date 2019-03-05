const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 40 })) {
    errors.name = "Name must be between 2 and 40 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name Field is Required";
  }

  if (!Validator.isLength(data.username, { min: 2, max: 25 })) {
    errors.username = "Username must be between 2 and 25 characters";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Name Field is Required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email Field is Required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password Field is Required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password Field is Required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords don't match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
