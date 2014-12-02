import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('signup');
  },

  actions: {
    // display an error when authentication fails
    signup: function() {
      var self = this;
      this.get('controller.model').save().then(function(m){
        self.get('session').authenticate('authenticator:signup', m.get('user'));
      }, function(reason) {
        self.set('controller.serverErrorMessage', reason.responseJSON.message);
      });
    }
  }

});
