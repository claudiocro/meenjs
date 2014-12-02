'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
  jwt = require('jsonwebtoken');

/**
 * Signup
 */
exports.signup = function(req, res) {
	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;
	// Init Variables
  var user = new User(req.body.signup);
	var message = null;

	// Add missing user fields
	user.provider = 'local';
	user.displayName = user.firstName + ' ' + user.lastName;

	// Then save the user
	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

      var response,
          token = jwt.sign({id:user._id}, "secret2", { expiresInMinutes: 60*5 });

      user.token = token;

      res.json({
        signup: {
          id: "me",
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          password: undefined,
          user: user._id
        },
        users: [user]
      });
		}
	});
};

/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
	passport.authenticate('local', { session: false }, function(err, user, info) {
		if (err || !user) {
			res.status(400).send(info);
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

      var token = jwt.sign({id:user._id}, 'secret2', { expiresInMinutes: 60*5 });
      user.token = token;
      res.json({user:user});

		}
	})(req, res, next);
};


exports.token = function(req, res) {
  var token = req.body.token;
  jwt.verify(token, 'secret2', function(err, decoded) {
    if (err) res.status(400).send('invalid_token');
    else  {

      User.findOne({
        _id: req.userid.id
      }, '-salt -password', function(err, user) {

        token = jwt.sign({id:req.userid.id}, 'secret2', { expiresInMinutes: 60*5 });
        user.token = token
        res.json({user:user});

      });
    }
  });
};
