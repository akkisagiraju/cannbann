const jwt = require('jsonwebtoken');
const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:', request.path);
  logger.info('Body:', request.body);
  next();
};

const tokenExtractor = (request, response, next) => {
  let authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    authorization = authorization.substring(7);
    const isTokenValid = jwt.verify(authorization, process.env.SECRET_KEY);
    if (!isTokenValid) {
      return response.status(401).send({ error: 'Invalid token' });
    }
    request.token = authorization;
    next();
  }
  return response.status(401).send({ error: 'Token is not supplied' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    response.send(400).send({ error: 'Malformatted ID' });
  } else if (error.name === 'ValidationError') {
    response.send(400).send({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    response.send(401).send({ error: 'Invalid token' });
  }

  next(error);
};

module.exports = {
  requestLogger,
  errorHandler,
  tokenExtractor
};
