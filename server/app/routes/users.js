'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
  // User Routes
  var users = require('../../app/controllers/users');

  app.route('/api/1/users/:userId').get(users.me);
  app.route('/api/1/users/:userId').put(users.update);
  app.route('/api/1/signups').post(users.signup);

  app.route('/api/1/changepasswords').post(users.changePassword);

  app.route('/auth/token').post(users.token);
  app.route('/auth/signin').post(users.signin);


  app.param('userId', users.userByID);
};
