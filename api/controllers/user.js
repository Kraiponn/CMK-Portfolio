const asyncHanler = require("express-async-handler");
const { validationResult } = require("express-validator");

const ErrorResponse = require("../utils/handle/ErrorResponse");
const {
  validateBodyResults,
} = require("../utils/validationBody/validateResults");

const { queryUsers, FIND_BY_USER_NAME } = require("../services/searchUsers");
const { cloudinary } = require("../utils/config/cloudinary");
const User = require("../models/User");

// @desc    Get user
// @route   GET /api/v2021/users/getuser/:userId
// @access  Private
exports.getUser = asyncHanler(async (req, res, next) => {
  const user = await User.findById(req.params.userId).select("+password");

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.userId}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// @desc    Get all users
// @route   GET /api/v2021/users/getusers
// @access  Private
exports.getUsers = asyncHanler(async (req, res, next) => {
  queryUsers(User, FIND_BY_USER_NAME, req, res);
});

// @desc    Create user
// @route   POST /api/v2021/users/createduser
// @access  Private
exports.createdUser = asyncHanler(async (req, res, next) => {
  // Validate input
  const error = validationResult(req);
  validateBodyResults(error);

  const foundUser = await User.findOne({ email: req.body.email });

  if (foundUser) {
    return next(
      new ErrorResponse(`An account with this email already exists`, 400)
    );
  }

  let userObj = {};
  let imgObj;

  if (req.file) {
    imgObj = await cloudinary.uploader.upload(req.file.path);

    if (!imgObj.public_id) {
      return next(
        new ErrorResponse(
          `Upload image to server not success please try again.`,
          400
        )
      );
    }

    userObj.image = {
      public_id: imgObj.public_id,
      secure_url: imgObj.secure_url,
    };
  }

  const { username, email, password, role, mobile, address, age, sex } =
    req.body;

  userObj.username = username;
  userObj.email = email;
  userObj.password = password;
  userObj.role = role || "User";
  userObj.credentials = {
    mobile: mobile || "",
    address: address || "",
    age: age || 0,
    sex: sex || "",
  };

  const user = await User.create(userObj);

  if (!user) {
    return next(
      new ErrorResponse(`Some thing went wrong please try again.`, 400)
    );
  }

  res.status(201).json({
    success: true,
    data: {
      message: `Added new user is successfully.`,
      user,
    },
  });
});

// @desc    Update password
// @route   PUT /api/v2021/users/updatedpassword/:userId
// @access  Private
exports.updatedPassword = asyncHanler(async (req, res, next) => {
  // Validate input
  const error = validationResult(req);
  validateBodyResults(error);

  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(
      new ErrorResponse(
        `There is no user with that id ${req.params.userId}`,
        404
      )
    );
  }

  user.password = req.body.password;

  await user.save();

  res.status(200).json({
    success: true,
    data: {
      message: `User updated successfully`,
    },
  });
});

// @desc    Update user
// @route   PUT /api/v2021/users/updatedpassword/:userId
// @access  Private
exports.updatedUser = asyncHanler(async (req, res, next) => {
  // Validate input
  const error = validationResult(req);
  validateBodyResults(error);

  // console.log("body", req.body);
  // if (req.file) {
  //   console.log("file path", req.file.path);
  // }

  let imgObj;

  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${userId}`, 404));
  }

  // Remove image from cloudinary if admin provided new image
  if (req.file) {
    if (user.image.public_id) {
      // Delete old image from cloudinary
      await cloudinary.uploader.destroy(user.image.public_id);
    }

    // Upload new image to cloudinary
    imgObj = await cloudinary.uploader.upload(req.file.path);

    user.image = {
      public_id: imgObj.public_id,
      secure_url: imgObj.secure_url,
    };
  }

  const { username, email, role, mobile, address, age, sex } = req.body;

  user.username = username ? username : user.username;
  user.email = email ? email : user.email;
  user.role = role ? role : user.role;
  user.credentials = {
    mobile: mobile ? mobile : user.credentials.phone.mobile,
    address: address ? address : user.credentials.address,
    age: age ? age : user.credentials.age,
    sex: sex ? sex : user.sex,
  };

  await user.save();

  res.status(200).json({
    success: true,
    data: {
      message: `User updated successfully`,
      user,
    },
  });
});

// @desc    Remove user
// @route   DELETE /api/v2021/users/deleteduser/:userId
// @access  Private
exports.deletedUser = asyncHanler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.userId);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.userId}`, 404)
    );
  }

  if (user.image) {
    const rmResult = await cloudinary.uploader.destroy(user.image.public_id);

    if (!rmResult) {
      return next(
        new ErrorResponse(
          `Some thing went wrong about removed image from server. Please try again`,
          400
        )
      );
    }
  }

  res.status(200).json({
    success: true,
    data: {
      message: `Deleted user is successfully`,
    },
  });
});
