import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('changepassword');
  },

  actions: {
    // display an error when authentication fails
    changePassword: function() {
      var self = this;
      this.get('controller.model').save().then(function(){
        self.transitionTo('index');
      }, function(reason) {
        self.set('controller.serverErrorMessage', reason.responseJSON.message);
      });
    }
  }

});
