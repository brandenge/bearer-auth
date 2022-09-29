'use strict';

const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) next('Invalid Login');
  const token = req.headers.authorization.split(' ')[1];
  try {
    const validUser = await users.authenticateWithToken(token);
    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
    console.error('Error in bearer.js:', e.message);
    res.status(403).send('Invalid Login');
  }
}
