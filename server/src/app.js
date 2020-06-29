const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const authRouter = require('./controllers/auth');
const boardRouter = require('./controllers/board');

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

app.use(middleware.errorHandler);

module.exports = app;
