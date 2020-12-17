'use strict';

const users = require('../models/users.js')

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { next('log in') }
    // console.log('OI:', req.headers);
    const token = req.headers.authorization.split(' ').pop();
    // console.log('13 TOKEN:', token);
    const validUser = await users.authenticateWithToken(token);
    // console.log('13GIMME USER', validUser);
    req.user = validUser;
    req.token = validUser.token;
    next();

  } catch (e) {
    res.status(403).send('invalid login')
  }

  function _authError() {
    next('Invalid Login');
  }
}

