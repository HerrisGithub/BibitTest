const BusinessError = require('../error/BusinessError');

const errorHandler = (error, req, res, next) => {
  const { error: errorLogger } = console;
  // First, log error
  errorLogger(error);
  if (error instanceof BusinessError) {
    const {
      status, code, message, reasons,
    } = error;
    res.status(status).json({
      status, code, message, reasons,
    });
  } else {
    const status = 500;
    const code = 50000;
    const { message, stack } = error;
    res.status(status).json({
      status,
      code,
      message: 'Internal server error',
      developer_message: message,
      stack,
    });
  }
};

module.exports = errorHandler;
