const jwt = require('jsonwebtoken');
const logger = require('./logger');
const { getErrorCode, getErrorMessage } = require('./helper');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:', request.path);
  logger.info('Body:', request.body);
  next();
};

const isAuthTokenNonEmpty = (auth) =>
  auth && auth.toLowerCase().startsWith('bearer ');

const isAuthTokenValid = (token) => jwt.verify(token, process.env.SECRET_KEY);

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (isAuthTokenNonEmpty(authorization)) {
    const token = authorization.substring(7);
    if (!isAuthTokenValid(token)) {
      return response.status(401).send({ error: 'Invalid token' });
    }
    request.token = token;
    next();
  }

  return response.status(401).send({ error: 'Token is not supplied' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  const errorCode = getErrorCode(error);
  const errorMessage = getErrorMessage(error);

  response.status(errorCode).send({ error: errorMessage });

  next(error);
};

module.exports = {
  requestLogger,
  errorHandler,
  tokenExtractor
};
