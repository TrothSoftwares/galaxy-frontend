import Ember from 'ember';

export default Ember.Controller.extend({
  isCreateCustomerButtonDisabled: Ember.computed( 'name'   ,  function() {
    if( Ember.isEmpty(this.get('name'))
  ){return 'disabled';}
  else{return '';}
  }),

  actions:{

    createCustomer:function(){
    var controller = this;

    var customer = this.store.createRecord('customer', {
        name :this.get('name'),
        address :this.get('address'),
        contact :this.get('contact'),
        email :this.get('email')
      });

      customer.save().then(function(){
        controller.notifications.addNotification({
        message: 'Saved!' ,
        type: 'success',
        autoClear: true
      });
      controller.transitionToRoute('dashboard.customers.index');
      });
    }
  }
});
