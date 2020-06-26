const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('express-async-errors');

userRouter.post('/signup', async (request, response) => {
  const { name, email, password } = request.body;
  const SALT_ROUNDS = 10;
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = new User({ name, email, passwordHash });
  await user.save();
  response.status(200).send({ message: 'User signed up successfully' });
});

module.exports = userRouter;
