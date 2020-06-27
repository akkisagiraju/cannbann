const jwt = require('jsonwebtoken');
const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:', request.path);
  logger.info('Body:', request.body);
  next();
};

const isAuthTokenNonEmpty = (auth) =>
  auth && auth.toLowerCase().startsWith('bearer ');

const isAuthTokenValid = (auth) => jwt.verify(auth, process.env.SECRET_KEY);

const tokenExtractor = (request, response, next) => {
  let authorization = request.get('authorization');

  if (isAuthTokenNonEmpty(authorization)) {
    authorization = authorization.substring(7);
    if (!isAuthTokenValid(authorization)) {
      return response.status(401).send({ error: 'Invalid token' });
    }
    request.token = authorization;
    next();
  }

  return response.status(401).send({ error: 'Token is not supplied' });
};

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

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  const errorCode = getErrorCode(error);
  const errorMessage = getErrorMessage(error);

  response.send(errorCode).send({ error: errorMessage });

  next(error);
};

module.exports = {
  requestLogger,
  errorHandler,
  tokenExtractor
};
