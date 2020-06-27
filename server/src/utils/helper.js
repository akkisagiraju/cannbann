/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const isAuthTokenNonEmpty = (auth) =>
  auth && auth.toLowerCase().startsWith('bearer ');

const isAuthTokenValid = (token) => jwt.verify(token, process.env.SECRET_KEY);

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

const generatePasswordHash = async (password) => {
  const SALT_ROUNDS = 10;
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  return passwordHash;
};

const generateUserToken = (user) => {
  const tokenObject = {
    email: user.email,
    id: user._id
  };

  return jwt.sign(tokenObject, process.env.SECRET_KEY);
};

module.exports = {
  isAuthTokenNonEmpty,
  isAuthTokenValid,
  getErrorMessage,
  getErrorCode,
  generatePasswordHash,
  generateUserToken
};
