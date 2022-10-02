'use strict';

const express = require('express');
const authRouter = express.Router();

const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer.js');
const {
  handleSignin,
  handleSignup,
  handleGetUsers,
  handleSecret,
  handleHello,
} = require('./handlers.js');

authRouter.post('/signup', handleSignup);
authRouter.post('/signin', basicAuth, handleSignin);
authRouter.get('/users', bearerAuth, handleGetUsers);
authRouter.get('/secret', bearerAuth, handleSecret);
authRouter.get('/hello', basicAuth, handleHello);

module.exports = authRouter;
