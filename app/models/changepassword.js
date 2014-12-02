import DS from 'ember-data';

export default DS.Model.extend({
  currentPassword: DS.attr('string'),
  newPassword: DS.attr('string'),
  verifyPassword: DS.attr('string')
});
