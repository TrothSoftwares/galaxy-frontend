import Ember from 'ember';

export default Ember.Controller.extend({

  enableEnquiryCustomer: false,
  enableNewCustomer :false,
  enableCustomer :false,

  months : Ember.computed('totalprice','installpricepermonth',function(){
    if(this.get('totalprice')&&this.get('installpricepermonth') ){
     return parseInt(this.get('totalprice') / parseInt(this.get('installpricepermonth')));
   }
    else{
      return 0;
    }
  }),

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
      var customer,sale;




      if(this.get('enableNewCustomer') ===true){
      customer = controller.store.createRecord('customer', {
        name :this.get('newcustomername'),
        address :this.get('newcustomeraddress'),
        contact :this.get('newcustomercontact'),
        email :this.get('newcustomeremail')
      });
      customer.save().then(function(){

          sale = controller.store.createRecord('sale', {

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

          controller.set('newcustomername','');
          controller.set('newcustomeraddress','');
          controller.set('newcustomercontact','');
          controller.set('newcustomeremail','');

          controller.set('totalprice','');
          controller.set('installpricepermonth','');
          controller.set('months','');

          controller.transitionToRoute('dashboard.sales.index');
          });
      });
       }






if(this.get('enableCustomer') ===true){ //if default customer
   customer = this.get('defaultcustomer');
     sale = controller.store.createRecord('sale', {

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
     controller.set('totalprice','');
     controller.set('installpricepermonth','');
     controller.set('months','');
     controller.transitionToRoute('dashboard.sales.index');
     });
}





if(this.get('enableEnquiryCustomer') ===true){ //if default customer
  customer = controller.store.createRecord('customer', {
    name :this.get('enquirycustomer.name'),
    address :this.get('enquirycustomer.address'),
    contact :this.get('enquirycustomer.contact'),
    email :this.get('enquirycustomer.email')
  });
  customer.save().then(function(){

      sale = controller.store.createRecord('sale', {

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


        controller.set('totalprice','');
        controller.set('installpricepermonth','');
        controller.set('months','');

      controller.transitionToRoute('dashboard.sales.index');
      });
  });
}






    }
  }
});
