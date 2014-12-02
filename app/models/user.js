import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  username: DS.attr('string'),
  displayName: DS.attr('string'),
  token: DS.attr('string')
});

