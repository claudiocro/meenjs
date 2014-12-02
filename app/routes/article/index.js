import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  actions: {
    delete: function() {
      var self = this;
      this.get('controller.model').deleteRecord();
      this.get('controller.model').save().then(function() {
        self.transitionTo('articles');
      });
    }
  }
});
