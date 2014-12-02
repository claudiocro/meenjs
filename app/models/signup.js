import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  username: DS.attr('string'),
  password: DS.attr('string'),

  user: DS.belongsTo('user')
});
