'use strict';

module.exports = function(app, options) {


  /**
   * Module dependencies.
   */
  var init = require('./config/init')(),
    config = require('./config/config'),
    mongoose = require('mongoose'),
    chalk = require('chalk'),
    path = require('path');

  /**
   * Main application entry file.
   * Please note that the order of loading is important.
   */

  // Bootstrap db connection
  var db = mongoose.connect(config.db, function(err) {
    if (err) {
      console.error(chalk.red('Could not connect to MongoDB!'));
      console.log(chalk.red(err));
    }
  });

  // Init the express application
  require('./config/express')(app,db);

  // Initialize strategies
  require('./config/strategies/local')();


  // Expose app
  //exports = module.exports = app;

  // Logging initialization
  console.log('MEEN.JS server started');

}


