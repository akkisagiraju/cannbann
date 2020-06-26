/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */

const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('express-async-errors');
const User = require('../models/User');

authRouter.post('/signup', async (request, response) => {
  const { name, email, password } = request.body;

  const SALT_ROUNDS = 10;
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = new User({ name, email, passwordHash });
  await user.save();

  response.status(200).send({ message: 'User signed up successfully' });
});

authRouter.post('/signin', async (request, response) => {
  const { email, password } = request.body;

  // check if the user is in db using the email
  const user = await User.findOne({ email });

  const isPasswordCorret =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!user || !isPasswordCorret) {
    response.status(401).json({ error: 'Invalid username or password' });
  } else {
    const tokenObject = {
      email: user.email,
      id: user._id
    };

    const token = jwt.sign(tokenObject, process.env.SECRET_KEY);

    response.status(200).send({ token, name: user.name, email: user.email });
  }
});

module.exports = authRouter;
