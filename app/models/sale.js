import DS from 'ember-data';
// import Ember from 'ember';

export default DS.Model.extend({

totalprice: DS.attr('number'),
status: DS.attr('string'),
installpricepermonth: DS.attr('number'),
months: DS.attr('number'),
equation: DS.attr('string'),
customer: DS.belongsTo('customer' ,{async:true}),
installments: DS.hasMany('installment' ,{embedded: 'always', async:true}),
});
