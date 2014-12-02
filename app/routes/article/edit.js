import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{

  templateName: 'articles.new',

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
