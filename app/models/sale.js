import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({

totalprice: DS.attr('number'),
status: DS.attr('string'),
installpricepermonth: DS.attr('number'),
createdat: DS.attr('date'),
equation: DS.attr('string'),
downpayment: DS.attr('number'),
asset: DS.attr('string'),
customer: DS.belongsTo('customer' ,{async:true}),
installments: DS.hasMany('installment' ,{embedded: 'always', async:true}),


// createdatMonth: function(){
// this.get('createdat').getMonth();
//
// },

createdatMonth : Ember.computed('createdat',function(){
  return this.get('createdat').getMonth();
}),


paidtillnow: function() {
    return this.get('installments').reduce(function(sum, split) {
        return sum + parseInt(split.get('amount'));
    }, 0);
}.property('installments.@each.amount'),

balanceamount : Ember.computed('totalprice','paidtillnow',function(){
  return parseInt(this.get('totalprice') - parseInt(this.get('downpayment'))- parseInt(this.get('paidtillnow')));
}),


months: Ember.computed('balanceamount' , 'installpricepermonth', function() {
    // let balance  = parseInt(this.get('totalprice')) - parseInt(this.get('paidtillnow'));

    let months = this.get('balanceamount') / this.get('installpricepermonth');
    return Math.round(months);
  }),
});
