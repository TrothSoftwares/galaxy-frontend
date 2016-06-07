import Ember from 'ember';

export default Ember.Controller.extend({

  enableEnquiryCustomer: false,
  enableNewCustomer :false,

  actions:{
    enableEnquiryCustomer:function(){
      this.set('enableNewCustomer', false);
      this.toggleProperty('enableEnquiryCustomer');
    },
    enableNewCustomer:function(){
      this.set('enableEnquiryCustomer', false);
      this.toggleProperty('enableNewCustomer');
    },
  }
});
