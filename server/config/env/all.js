'use strict';

module.exports = {
	app: {
		title: 'MEEN',
		description: 'Full-Stack JavaScript with MongoDB, Express, Ember, and Node.js',
		keywords: 'mongodb, express, Ember, node.js, mongoose, passport'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEEN',
	sessionCollection: 'sessions',
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'combined',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			stream: 'access.log'
		}
	},
  jwtSecret: "secret2"
};
