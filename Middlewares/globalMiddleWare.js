const AppError = require("../utils/classes/AppError");
const { catchAsync } = require("../utils/utilities");
const { promisify } = require("node:util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.onlyLoggedIn = catchAsync(async (req, res, next) => {
  const cookie = req.cookies[process.env.COOKIE_NAME];

  if (!cookie) return next(new AppError("You are not logged in", 401, { textCode: "UNAUTHORIZED" }));

  const token = await promisify(jwt.verify)(cookie, process.env.JWT_SECRET);

  const user = await User.findById(token.id);
  if (!user) return next(new AppError("No user found. Please Log in again", 404));

  req.user = user;

  next();
});
