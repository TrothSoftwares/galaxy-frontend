import Ember from 'ember';

export default Ember.Controller.extend({

  enableEnquiryCustomer: false,
  enableNewCustomer :false,
  enableCustomer :false,

  iscreateSaleButtonEnabled: Ember.computed( 'totalprice'   ,  function() {
    if( Ember.isEmpty(this.get('totalprice'))
  ){return 'disabled';}
  else{return '';}
  }),

  actions:{
    enableEnquiryCustomer:function(){
      this.set('enableNewCustomer', false);
      this.set('enableCustomer', false);
      this.toggleProperty('enableEnquiryCustomer');
    },
    enableCustomer:function(){
      this.set('enableEnquiryCustomer', false);
      this.set('enableNewCustomer', false);
      this.toggleProperty('enableCustomer');
    },
    enableNewCustomer:function(){
      this.set('enableEnquiryCustomer', false);
      this.set('enableCustomer', false);
      this.toggleProperty('enableNewCustomer');
    },


    createSale:function(){

      var controller =this;
      var customer,name,address,contact,email;

      if(this.get('enableEnquiryCustomer') === true){
        name = this.get('enquirycustomer.name');
        address = this.get('enquirycustomer.address');
        contact = this.get('enquirycustomer.contact');
        email = this.get('enquirycustomer.email');
      }
      if(this.get('enableNewCustomer') === true){
        name = this.get('newcustomername');
        address = this.get('newcustomeraddress');
        contact = this.get('newcustomercontact');
        email = this.get('newcustomeremail');
    }


if(this.get('enableCustomer') !==true){
     customer = controller.store.createRecord('customer', {
        name :name,
        address :address,
        contact :contact,
        email :email
      });
      customer.save().then(function(){

        });
      }
if(this.get('enableCustomer') ===true){
  customer = this.get('defaultcustomer');
}


        var sale = controller.store.createRecord('sale', {
            status :'Incomplete',
            totalprice :controller.get('totalprice'),
            installpricepermonth : controller.get('installpricepermonth'),
            months :controller.get('months'),
            customer :customer
          });

          sale.save().then(function(){
            controller.notifications.addNotification({
            message: 'Saved!' ,
            type: 'success',
            autoClear: true
          });
          controller.transitionToRoute('dashboard.sales.index');
          });


    }
  }
});
