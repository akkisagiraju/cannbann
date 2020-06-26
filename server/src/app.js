const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const userRouter = require('./controllers/user');
// const loginRouter = require('./controllers/login');

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(cors());
app.use(express.json());

app.use('/api', userRouter);
// app.use('/login', loginRouter);

app.use(middleware.errorHandler);

module.exports = app;
