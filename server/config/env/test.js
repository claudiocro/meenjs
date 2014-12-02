'use strict';

module.exports = {
	db: 'mongodb://localhost/meen-test',
	port: 3001,
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'dev',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			//stream: 'access.log'
		}
	},
	app: {
		title: 'MEEN - Test Environment'
	}
};
