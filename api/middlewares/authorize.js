import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import ErrorResponse from "../utils/handle/ErrorResponse";
import User from "../models/User";

// Check authentication to access route
const isAuth = asyncHandler(async (req, res, next) => {
  let token;
  const tokenPrefix = process.env.JWT_PREFIX_DATA;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith(tokenPrefix)
  ) {
    token = req.headers.authorization.split(" ")[1];
    // console.log("Current token:", token);
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(
        new ErrorResponse("Not authorized to access this route", 401)
      );
    }

    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 403));
  }
});

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} not authorized to access this route`,
          403
        )
      );
    }

    next();
  };
};

export { isAuth, authorize };
