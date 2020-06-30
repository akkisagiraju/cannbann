/* eslint-disable operator-linebreak */

const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
require('express-async-errors');
const { generatePasswordHash, generateUserToken } = require('../utils/helper');
const User = require('../models/User');

authRouter.post('/signup', async (request, response) => {
  const { name, email, password } = request.body;
  if (password.length < 3) {
    return response
      .status(400)
      .send({ error: 'Password has to be more than 3 characters' });
  }
  const passwordHash = await generatePasswordHash(password);
  const user = new User({ name, email, passwordHash });
  await user.save();

  return response.status(200).send({ message: 'User signed up successfully' });
});

authRouter.post('/signin', async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email });
  const isPasswordCorret =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordCorret) {
    return response.status(401).json({ error: 'Invalid email or password' });
  }
  const token = generateUserToken(user);

  return response
    .status(200)
    .send({ token, name: user.name, email: user.email });
});

module.exports = authRouter;
