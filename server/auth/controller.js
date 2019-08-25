var User = require('../api/corporation_user/corporation_user_Model');
var signToken = require('./auth').signToken;

exports.signin = function(req, res, next) {
  // req.staff_user will be there from the middleware
  // verify staff_user. Then we can just create a token
  // and send it back for the client to consume
  var token = signToken(req.user._id);
  res.json({access_token: token, user: req.user});
};
