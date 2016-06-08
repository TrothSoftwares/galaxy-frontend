import DS from 'ember-data';
// import Ember from 'ember';

export default DS.Model.extend({

date: DS.attr('string'),
amount: DS.attr('string'),
employee: DS.belongsTo('employee' ,{async:true}),
sale: DS.belongsTo('sale' ,{async:true}),
});
