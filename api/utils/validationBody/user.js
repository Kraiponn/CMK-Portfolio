const { body } = require("express-validator");

const isValidateCreatedUser = [
  body("username").notEmpty().withMessage("Please provide a username"),
  body("email")
    .notEmpty()
    .withMessage("Please provide an email")
    .isEmail()
    .withMessage("Please add a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Please provide a password")
    .isLength({ min: 6, max: 18 })
    .withMessage("Password must be between 6 and 18 characters"),
];

const isValidateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Please provide an email")
    .isEmail()
    .withMessage("Please add a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Please provide a password")
    .isLength({ min: 6, max: 18 })
    .withMessage("Password must be between 6 and 18 characters"),
];

const isValidateUpdatePwd = [
  body("password")
    .notEmpty()
    .withMessage("Please provide a password")
    .isLength({ min: 6, max: 18 })
    .withMessage("Password must be between 6 and 18 characters"),
];

const isValidateUpdatedUser = [
  body("username").notEmpty().withMessage("Please provide a username"),
  body("email")
    .notEmpty()
    .withMessage("Please provide an email")
    .isEmail()
    .withMessage("Please add a valid email"),
];

module.exports = {
  isValidateCreatedUser,
  isValidateLogin,
  isValidateUpdatePwd,
  isValidateUpdatedUser,
};
