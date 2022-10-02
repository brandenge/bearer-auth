'use strict';

const { users } = require('../models/index.js');

async function handleSignup(req, res, next) {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: {
        id: userRecord.id,
        username: userRecord.username,
      },
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    console.error('Error in handleSignup:', e.message);
    next(e);
  }
}

async function handleSignin(req, res, next) {
  try {
    const output = {
      user: {
        id: req.user.id,
        username: req.user.username,
        password: req.user.password,
        token: req.user.token,
      },
      token: req.user.token,
    };
    res.status(200).json(output);
  } catch (e) {
    console.error('Error in handleSignin:', e.message);
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await users.findAll();
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  } catch (e) {
    console.error('Error in handleGetUsers:', e.message);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).send("Welcome to the secret area!");
}

function handleHello(req, res, next) {
  res.status(200).send(`Hello from ${req.query.name}! This route is now secured by HTTP Basic authentication`)
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret,
  handleHello,
};
