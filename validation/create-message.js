const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMessageInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 1, max: 2000 })) {
    errors.text = "Message character maximum is 2000";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Message cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
