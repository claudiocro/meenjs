import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  model: function() {
    return this.store.createRecord('article');
  },

  actions: {
    save: function() {
      var self = this;
      this.get('controller.model').save().then(function() {
        self.transitionTo('articles');
      }, function(reason) {
        self.set('controller.serverErrorMessage', reason.responseJSON.message);
      });
    }
  }
});
