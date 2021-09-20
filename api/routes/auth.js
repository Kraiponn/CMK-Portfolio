import express from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  updatePassword,
  forgotPassword,
  resetPassword,
  removedAccount,
} from "../controllers/auth.js";
import {
  isValidateRegisInput,
  isValidateLoginInput,
  isValidateUpdatePwdInput,
  isValidateProfileInput,
  isValidateForgotPwdInput,
  isValidateResetPwdInput,
} from "../utils/validationBody/auth";

import { uploader } from "../utils/config/cloudinary";
import { isAuth } from "../middlewares/authorize";

const router = express.Router();

router.post("/register", isValidateRegisInput, register);

router.post("/login", isValidateLoginInput, login);

router.get("/getprofile", isAuth, getProfile);

router.put(
  "/updateprofile",
  uploader.single("avatar"),
  isValidateProfileInput,
  isAuth,
  updateProfile
);

router.put("/updatepassword", isValidateUpdatePwdInput, isAuth, updatePassword);

router.post("/forgotpassword", isValidateForgotPwdInput, forgotPassword);

router.put("/resetpassword/:tokenId", isValidateResetPwdInput, resetPassword);

router.post("/removedaccount", isAuth, removedAccount);

export default router;
