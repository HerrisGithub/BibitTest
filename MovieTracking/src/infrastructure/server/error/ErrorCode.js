const ErrorCode = {
  InvalidParameter: {
    status: 400,
    code: 40001,
    message: 'Parameter is invalid',
  },

  NotFoundUrl: {
    status: 404,
    code: 40401,
    message: 'Url not exists, or maybe you\'re requesting wrong http method',
  },

  TooManyRequest: {
    status: 429,
    code: 42901,
    message: 'Too many accounts created from this IP, please try again after a minute.',
  },
};

module.exports = ErrorCode;
