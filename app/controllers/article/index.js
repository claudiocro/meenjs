import Ember from 'ember';

export default Ember.ObjectController.extend({
  isEditable: function() {
    return this.get('session.user.id') === this.get('user.id');
  }.property('user.id')
});
