'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Article = mongoose.model('Article'),
  User = mongoose.model('User'),
	_ = require('lodash');

/**
 * Create a article
 */
exports.create = function(req, res) {
  delete req.body.article.created;

	var article = new Article(req.body.article);
	User.findById(req.userid.id, function(err,user) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      article.user = user;
      article.save(function(err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json({article:article});
        }
      });
    }
  });
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
	res.json({
    article:req.article
  });
};

/**
 * Update a article
 */
exports.update = function(req, res) {
	var article = req.article;

  delete req.body.article.user;
	article = _.extend(article, req.body.article);

	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json({article:article});
		}
	});
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
	var article = req.article;

	article.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json({article:article});
		}
	});
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
	Article.find().sort('-created').populate('user').exec(function(err, articles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json({articles: articles});
		}
	});
};

/**
 * Article middleware
 */
exports.articleByID = function(req, res, next, id) {
	Article.findById(id).populate('user', '-password -salt').exec(function(err, article) {
		if (err) return next(err);
		if (!article) return next(new Error('Failed to load article ' + id));
		req.article = article;
		next();
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.article.user.id !== req.userid.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
