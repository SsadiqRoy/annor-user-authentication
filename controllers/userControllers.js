const { promisify } = require('node:util');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const AppError = require('../utils/classes/AppError');
const { catchAsync } = require('../utils/utilities');

exports.newUser = catchAsync(async (req, res, next) => {
  const { fullName, email, username, studentId, password } = req.body;

  const body = { fullName, email, username, studentId, password };

  const user = await User.create(body);

  res.status(200).json({
    status: 'success',
    message: `New user ${user.fullName} added`,
    data: user,
  });
});

//

exports.login = catchAsync(async (req, res, next) => {
  const { username, password, studentId } = req.body;

  const user = await User.findOne({ username, studentId }).select('+password');
  if (!user) return next(new AppError('No account found', 404, { textCode: 'NOT_FOUND' }));

  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) return next(new AppError('Incorrect Credentials. Please check your credentials', 406));

  const token = await promisify(jwt.sign)({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: +process.env.JWT_DURATION,
    issuer: process.env.JWT_ISSUER,
  });

  const cookieOptions = {
    expires: new Date(Date.now() + +process.env.COOKIE_DURATION),
    httpOnly: true,
    secure: true,
    domain: process.env.COOKIE_DOMAIN,
  };

  const manualCookie = {
    cookieName: process.env.COOKIE_NAME,
    token,
    cookieOptions,
  };

  res.set('manual-cookie', JSON.stringify(manualCookie));
  res.cookie(process.env.COOKIE_NAME, token, cookieOptions);

  const newuser = await User.findById(user.id);

  res.status(200).json({
    status: 'success',
    message: `Welcome back ${user.fullName}`,
    data: newuser,
  });
});

//

exports.logout = catchAsync(async (req, res, next) => {
  const cookieOptions = {
    expires: new Date(Date.now() - 1000),
    httpOnly: true,
    secure: true,
    domain: process.env.COOKIE_DOMAIN,
  };

  const manualCookie = {
    cookieName: process.env.COOKIE_NAME,
    token: null,
    cookieOptions,
  };

  res.set('manual-cookie', JSON.stringify(manualCookie));
  res.cookie(process.env.COOKIE_NAME, null, cookieOptions);

  res.status(200).json({
    status: 'success',
    message: 'You are now logged out',
  });
});

//

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  res.status(200).json({ status: 'success', data: req.user });
});

//

exports.update = catchAsync(async (req, res, next) => {
  const { fullName, email, username, studentId } = req.body;

  const body = { fullName, email, username, studentId };

  const user = await User.findByIdAndUpdate(req.user.id, body, { runValidators: true, new: true });

  res.status(200).json({
    status: 'success',
    message: 'Account details updated',
    data: user,
  });
});

//

exports.changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select('+password');

  const correctPassword = await bcrypt.compare(currentPassword, user.password);
  if (!correctPassword) return next(new AppError('Current Password is incorrect', 406));

  user.password = newPassword;
  await user.save();

  const newuser = await User.findById(user.id);

  res.status(200).json({
    status: 'success',
    message: `Password successfully changed`,
    data: newuser,
  });
});

//

exports.allUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    length: users.length,
    data: users,
  });
});

//

exports.oneUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: user,
  });
});
