/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */

const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  // check if the user is in db using the email
  const user = await User.findOne({ email });

  const isPasswordCorret =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!user || !isPasswordCorret) {
    response.status(401).json({ error: 'Invalid username or password' });
  }

  const tokenObject = {
    email: user.email,
    id: user._id
  };

  const token = jwt.sign(tokenObject, process.env.SECRET_KEY);

  response.status(200).send({ token, name: user.name, email: user.email });
});

module.exports = loginRouter;
