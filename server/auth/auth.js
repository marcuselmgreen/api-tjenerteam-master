var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var config = require('../config/config');
var checkToken = expressJwt({ secret: config.secrets.jwt });
var Corporation = require('../api/corporation_user/corporation_user_Model');

exports.decodeToken = function() {
  return function(req, res, next) {
    // make it optional to place token on query string
    // if it is, place it on the headers where it should be
    // so checkToken can see it. See follow the 'Bearer 034930493' format
    // so checkToken can see it and decode it

    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }

    // this will call next if token is valid
    // and send error if its not. It will attached
    // the decoded token to req.staff_user
    checkToken(req, res, next);
  };
};

exports.getFreshUser = function() {
  return function(req, res, next) {
    Corporation.findById(req.user._id)
      .then(function(user) {
        if (!user) {
          // if no staff_user is found it was not
          // it was a valid JWT but didn't decode
          // to a real staff_user in our DB. Either the staff_user was deleted
          // since the client got the JWT, or
          // it was a JWT from some other source
          res.status(401).send('Unauthorized');
        } else {
          // update req.staff_user with fresh staff_user from
          // stale token data
          req.user = user;
          next();
        }
      }, function(err) {
        next(err);
      });
  }
};

exports.verifyUser = function() {
  return function(req, res, next) {

    var email = req.body.email;
    var password = req.body.password;

    // if no username or password then send
    if (!email || !password) {
      res.status(400).send('You need a username and password');
      return;
    }

    // look staff_user up in the DB so we can check
    // if the passwords match for the username
    Corporation.findOne({email: email})
      .then(function(user) {
        if (!user) {
          res.status(401).send('No staff_user with the given username');
        } else {
          // checking the passowords here
          if (!user.authenticate(password)) {
            res.status(401).send('Wrong password');
          } else {
            // if everything is good,
            // then attach to req.staff_user
            // and call next so the controller
            // can sign a token from the req.staff_user._id
            user.password = "";
            user.gdpr = "";
            req.user = user;
            next();
          }
        }
      }, function(err) {
        next(err);
      });
  };
};

// util method to sign tokens on signup
exports.signToken = function(id) {
  return jwt.sign(
    {_id: id},
    config.secrets.jwt,
    {expiresIn: config.expireTime}
  );
};
