import Ember from 'ember';
import startApp from '../helpers/start-app'; // change this due to your folder hierarchy

var App;

module('Integration Test', {
  setup: function(){
    App = startApp();
  },
  teardown: function(){
    Ember.run(App, 'destroy');
  }
});


// Replace this with your real tests.
test('navigation', function() {
  visit('/').then(function(){
    equal(find('#navbar .navbar-right li').length, 2, 'Signin / Signout');
    equal(find('#navbar .navbar-nav:eq(0) li').length, 0, 'Main navigation');
  });
});
