import DS from 'ember-data';
// import Ember from 'ember';

export default DS.Model.extend({

name: DS.attr('string'),
address: DS.attr('string'),
contact: DS.attr('string'),
email: DS.attr('string'),
status: DS.attr('string'),
followupdate: DS.attr('date'),
remarks: DS.attr('string'),
date: DS.attr('date'),
employee: DS.belongsTo('employee' ,{async:true}),
followups: DS.hasMany('followup' ,{embedded: 'always', async:true}),
});
