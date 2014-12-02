import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('signup');
  this.route('signin');

  this.resource('articles', function(){
    this.route('new');
  });

   this.resource('article', { path: '/article/:article_id' }, function() {
    this.route('edit');
  });


  this.resource('settings', { path: '/settings' }, function() {
    this.route('password');
    this.route('profile');
  });
});

export default Router;
