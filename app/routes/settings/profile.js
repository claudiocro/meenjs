import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.get('session.user');
  },

  actions: {
    save: function() {
      var self = this;
      this.get('controller.model').save().then(function() {
        self.transitionTo('index');
      });
    }
  }

});
