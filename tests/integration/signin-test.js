import Ember from 'ember';
import startApp from '../helpers/start-app'; // change this due to your folder hierarchy

var App;

module('Signin Integration Test', {
  setup: function(){
    App = startApp();
  },
  teardown: function(){
    Ember.run(App, 'destroy');
  }
});


// Replace this with your real tests.
test('signin', function() {
  visit('/signin').then(function(){
    fillIn('input.username', 'aaaaaaa');
    fillIn('input.password', 'aaaaaaa');
    click('button').then(function() {
      equal(find('.text-danger').text().trim(), 'aMissing credentials');
    });

    /*
    click('button').then(function() {
      equal(find('.text-danger').text().trim(), 'Missing credentials');
    });

    fillIn('input.username', 'aaaaaaa');
    click('button').then(function() {
      equal(find('.text-danger').text().trim(), 'Missing credentials');
    });

    fillIn('input.password', 'aa');
    click('button').then(function() {
      equal(find('.text-danger').text().trim(), 'Missing credentials');
    });

    fillIn('input.password', 'aaaaaaa');
    click('button').then(function() {
      equal(find('.text-danger').text().trim(), 'Missing credentials');
    });*/
  });
});
