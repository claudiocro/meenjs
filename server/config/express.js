'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  config = require('./config'),
  //cconfig = require('./config/config'),
  path = require('path'),
  expressJwt = require('express-jwt');

module.exports = function(app,db) {
  // Globbing model files
  config.getModuleFiles('./server/app/models/**/*.js').forEach(function(modelPath) {
    require(path.resolve(modelPath));
  });

  // Environment dependent middleware
  if (process.env.NODE_ENV === 'development') {

  } else if (process.env.NODE_ENV === 'production') {

  }

/*
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });
*/

  app.use('/api/*', expressJwt({secret: "secret2", userProperty:'userid'}).unless({path: ['/api/1/signups']}));
  app.use('/auth', expressJwt({secret: "secret2", userProperty:'userid'}).unless({path: ['/auth/signin']}));

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  config.getModuleFiles('./server/app/routes/**/*.js').forEach(function(routePath) {
    require(path.resolve(routePath))(app);
  });
};
