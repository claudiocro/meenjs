'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

/**
 * Update user details
 */
exports.update = function(req, res) {
	var message = null;

  // For security measurement we remove the roles from the req.body object
	delete req.body.roles;
	if (req.userid.id) {
    User.findOne({
      _id: req.userid.id
    },'-salt -password').exec(function(err, user) {
      if (err) {
        res.status(400).send({
          message: err
        });
      };
      if (!user) {
        res.status(400).send({
        message: 'Failed to load user'
      });
      }
      // Merge existing user
      delete req.body.user.password;
      user = _.extend(user, req.body.user);
      user.updated = Date.now();
      user.displayName = user.firstName + ' ' + user.lastName;

      user.save(function(err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json({user:user});
        }
      });
    });

	} else {
		res.status(400).send({
			message: 'Cannot update user not authenticated'
		});
	}
};

/**
 * Send User
 */
exports.me = function(req, res) {
  if(req.user._id == req.userid.id)
    res.json(req.user || null);
};
