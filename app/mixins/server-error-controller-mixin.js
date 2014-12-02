import Ember from 'ember';


export default Ember.Mixin.create({
  serverErrorMessage: null,

  clearError: function() {
    this.set('serverErrorMessage', null);
  }.observes('model')
});
