'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/router/index.js');
const PORT = process.env.PORT || 3002;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use(notFound);
app.use(errorHandler);

function start() {
  app.listen(PORT, () => console.log(`Server Up on ${PORT}`));
}

module.exports = {
  server: app,
  start,
};
