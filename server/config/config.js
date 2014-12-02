'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	glob = require('glob');

/**
 * Load app configurations
 */
module.exports = _.extend(
	require('./env/all'),
	require('./env/' + process.env.NODE_ENV) || {}
);

/**
 * Get files by glob patterns
 */
module.exports.getModuleFiles = function(globPatterns, removeRoot) {
	// For context switching
	var files = glob(globPatterns, {
    sync: true
  });

  if (removeRoot) {
    files = files.map(function(file) {
      return file.replace(removeRoot, '');
    });
  }

	return files;
};
