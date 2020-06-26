const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const authRouter = require('./controllers/auth');

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);

app.use(middleware.errorHandler);
app.use(middleware.tokenExtractor);

module.exports = app;
