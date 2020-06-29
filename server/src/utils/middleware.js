const logger = require('./logger');
const {
  getErrorCode,
  getErrorMessage,
  isAuthTokenNonEmpty,
  isAuthTokenValid
} = require('./helper');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:', request.path);
  logger.info('Body:', request.body);
  next();
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (isAuthTokenNonEmpty(authorization)) {
    const token = authorization.substring(7);
    if (!isAuthTokenValid(token)) {
      return response.status(401).send({ error: 'Invalid token' });
    }
    request.token = token;
    return next();
  }

  return response.status(401).send({ error: 'Token is not supplied' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  const errorCode = getErrorCode(error);
  const errorMessage = getErrorMessage(error);
  response.status(errorCode).send({ message: errorMessage });

  next(error);
};

module.exports = {
  requestLogger,
  errorHandler,
  tokenExtractor
};
