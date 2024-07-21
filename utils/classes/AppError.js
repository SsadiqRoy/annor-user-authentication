class AppError extends Error {
  constructor(message, statusCode, { url, textCode, errorCode } = {}) {
    super(message);

    this.status = String(statusCode).startsWith('4') ? 'failed' : 'error';
    this.statusCode = statusCode;
    this.message = message;
    this.errorCode = errorCode;
    this.textCode = textCode;
    this.url = url;
    this._message = message;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
