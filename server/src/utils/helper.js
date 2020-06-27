const getErrorMessage = (error) => {
  switch (error.name) {
    case 'CastError':
      return 'Malformatted ID';
    case 'ValidationError':
      return error.message;
    case 'JsonWebTokenError':
      return 'Invalid token';
    default:
      return 'Error occurred';
  }
};

const getErrorCode = (error) => {
  if (error.name === 'JsonWebTokenError') {
    return 401;
  }
  return 400;
};

module.exports = {
  getErrorMessage,
  getErrorCode
};
