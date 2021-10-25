const express = require("express");

const { uploader } = require("../utils/config/cloudinary");
const { isAuth, authorize } = require("../middlewares/authorize");
const {
  isValidateCreatedUser,
  isValidateLogin,
  isValidateUpdatedUser,
  isValidateUpdatePwd,
} = require("../utils/validationBody/user");

// Controller
const {
  createdUser,
  updatedPassword,
  updatedUser,
  deletedUser,
  getUser,
  getUsers,
} = require("../controllers/user");
const { login } = require("../controllers/auth");

const router = express.Router();

// Make sure user must be an admin role to access all routes
// router.use(isAuth);
// router.use(authorize("Admin"));

router.post(
  "/createduser",
  uploader.single("avatar"),
  isValidateCreatedUser,
  isAuth,
  authorize("Admin"),
  createdUser
);
router.post("/login", isValidateLogin, login);

router.put(
  "/updatedpassword/:userId",
  isValidateUpdatePwd,
  isAuth,
  authorize("Admin"),
  updatedPassword
);

router.put(
  "/updateduser/:userId",
  uploader.single("avatar"),
  isValidateUpdatedUser,
  isAuth,
  authorize("Admin"),
  updatedUser
);

router.delete("/deleteduser/:userId", isAuth, authorize("Admin"), deletedUser);

router.get("/getusers", isAuth, authorize("Admin"), getUsers);
router.get("/getuser/:userId", isAuth, authorize("Admin"), getUser);

module.exports = router;
