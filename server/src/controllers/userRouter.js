const userRouter = require('express').Router();

userRouter.get('/', async (req, res) => {
  res.status(200).json({ data: 'hello' });
});

module.exports = userRouter;
