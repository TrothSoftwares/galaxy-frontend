import DS from 'ember-data';
// import Ember from 'ember';

export default DS.Model.extend({

name: DS.attr('string'),
address: DS.attr('string'),
contact: DS.attr('string'),
email: DS.attr('string'),
sales: DS.hasMany('sale' ,{embedded: 'always', async:true}),
});
