'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	articles = require('../../app/controllers/articles');

module.exports = function(app) {

  console.log('register articles routes')

	// Article Routes
	app.route('/api/1/articles')
		.get(articles.list)
		.post(/*users.requiresLogin, */articles.create);

	app.route('/api/1/articles/:articleId')
		.get(articles.read)
		.put(users.requiresLogin, articles.hasAuthorization, articles.update)
		.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

	// Finish by binding the article middleware
	app.param('articleId', articles.articleByID);
};
