// Morgan is an log library
var morgan = require('morgan');
var bodyParser = require('body-parser');
// Cross origin resource sharing - makes it possible to call localhosts..
var cors = require('cors');
var override = require('method-override');
// setup global middleware here

module.exports = function(app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(override());
  };
