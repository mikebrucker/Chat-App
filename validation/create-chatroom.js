const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateChatroomInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";

  if (!Validator.isLength(data.name, { min: 1, max: 40 })) {
    errors.name = "Chatroom name is 40 characters maximum";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Please name the chatroom";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
