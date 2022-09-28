'use strict';

const { start } = require('./src/server.js');
const { db } = require('./src/auth/models/index.js');

db.sync().then(() => start(process.env.PORT));
