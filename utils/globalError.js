const AppError = require('./classes/AppError');

module.exports = async function globalError(error, req, res, next) {
  const originalMessage = error.message;
  let newerror = { ...error };

  // console.log(error);

  if (error.code === 11000) newerror = duplicationError(error);
  if (error.name === 'ValidationError') newerror = validationError(error);
  if (error.name === 'TokenExpiredError') newerror = jwtExpiryError(error);

  if (!newerror.isOperational) console.log('Global Error🔥', error);
  newerror.originalMessage = originalMessage;

  res.status(newerror.statusCode || 500).json(newerror);
};

function duplicationError(error) {
  console.log(error);
  const [key, value] = Object.entries(error.keyValue).at(0) || ['null', 'null'];

  const message = `${value} is already used. Please change your ${key}`;
  const newerror = new AppError(message, 417, { textCode: 'DUPLICATE_DB_FIELD' });

  return newerror;
}

function validationError(error) {
  const message = error.message.split(':').at(-1);
  return new AppError(message, 405, { textCode: 'DB_FIELD_VALIDATION' });
}

function jwtExpiryError() {
  return new AppError('You have been logged out. Please log in again', 417);
}
