import DS from 'ember-data';
// import Ember from 'ember';

export default DS.Model.extend({
  
date: DS.attr('date'),
message: DS.attr('string'),
followupdate: DS.attr('date'),
employee: DS.belongsTo('enquiry' ,{async:true}),

});
