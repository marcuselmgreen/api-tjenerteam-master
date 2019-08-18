var express = require('express');
var app = express();
var api = require('./api/api');
var config = require('./config/config');
var logger = require('./util/logger');
var auth = require('./auth/routes');
// db.url is different depending on NODE_ENV
const moongose = require('mongoose');

moongose.set('useCreateIndex', true);
moongose.connect(config.db.url, { useNewUrlParser: true });

if (config.seed) {
    require('./util/seed');
}

// setup the app middlware
require('./middleware/appMiddleware')(app);

// setup the api
app.use('/api', api);
app.use('/auth', auth);
// set up global error handling

app.use(function(err, req, res, next) {
    // if error thrown from jwt validation check
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('Invalid token');
      return;
    }

    logger.error(err.stack);
    res.status(500).send('Oops');
  });

  // export the app for testing
  module.exports = app;
