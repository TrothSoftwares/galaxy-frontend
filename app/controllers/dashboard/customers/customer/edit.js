import Ember from 'ember';

export default Ember.Controller.extend({
  isSaveCustomerButtonDisabled: Ember.computed( 'customer.name'   ,  function() {
    if( Ember.isEmpty(this.get('customer.name'))
  ){return 'disabled';}
  else{return '';}
  }),

  actions:{

    SaveCustomer:function(){
    var controller = this;

    var customer = this.get('customer');

      customer.save().then(function(){
        controller.notifications.addNotification({
        message: 'Saved!' ,
        type: 'success',
        autoClear: true
      });
       });
    }
  }
});
