import DS from 'ember-data';
// import Ember from 'ember';

export default DS.Model.extend({

name: DS.attr('string'),
address: DS.attr('string'),
contact: DS.attr('string'),
email: DS.attr('string'),
enquiries: DS.hasMany('enquiry' ,{embedded: 'always', async:true}),

});
