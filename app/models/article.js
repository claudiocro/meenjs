import DS from 'ember-data';

export default DS.Model.extend({
  created: DS.attr('date'),
  title: DS.attr('string'),
  content: DS.attr('string'),
  user: DS.belongsTo('user',{async:true})
});
