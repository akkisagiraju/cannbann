const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const authRouter = require('./controllers/auth');
const boardRouter = require('./controllers/board');
const listRouter = require('./controllers/list');
const cardRouter = require('./controllers/card');
const teamRouter = require('./controllers/team');

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);

app.use(middleware.tokenExtractor);

app.use('/api', boardRouter);
app.use('/api', listRouter);
app.use('/api', cardRouter);
app.use('/api', teamRouter);

app.use(middleware.errorHandler);

module.exports = app;
