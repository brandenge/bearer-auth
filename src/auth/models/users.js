'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || "TEST_SECRET";

const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false, },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET, {expiresIn: '15m'});
      },
      set(token) {
        return jwt.sign(token, SECRET, {expiresIn: '15m'});
      }
    }
  });

  model.beforeCreate(async (user) => {
    try {
      let hashedPass = await bcrypt.hash(user.password, 10);
      user.password = hashedPass;
    } catch (e) {
      console.error('Error in beforeCreate:', e.message);
      throw new Error(e);
    }
  });

  // Basic AUTH: Validating strings (username, password)
  model.authenticateBasic = async function (username, password) {
    try {
      const user = await this.findOne({ where: { username } });
      const valid = await bcrypt.compare(password, user.password);
      if (valid) return user;
      throw new Error('Invalid User');
    } catch (e) {
      console.error('Error in authenticateBasic:', e.message);
      throw new Error(e);
    }
  }

  // Bearer AUTH: Validating a token
  model.authenticateWithToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = await this.findOne({ where: { username: parsedToken.username } });
      if (user) return user;
      throw new Error('User Not Found');
    } catch (e) {
      console.error('Error in authenticateToken:', e.message);
      throw new Error(e);
    }
  }
  return model;
}

module.exports = userSchema;
