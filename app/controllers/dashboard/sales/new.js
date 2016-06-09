import Ember from 'ember';

export default Ember.Controller.extend({

  enableEnquiryCustomer: false,
  enableNewCustomer :false,
  enableCustomer :false,

  months : Ember.computed('totalprice' ,'downpayment','installpricepermonth',function(){
    if(this.get('totalprice')&&this.get('installpricepermonth') && this.get('downpayment') ){
      var balanceDown =  parseInt(this.get('totalprice')) - parseInt(this.get('downpayment'));

      var calcMonths = balanceDown /  parseInt(this.get('installpricepermonth'));
     return calcMonths;
   }
    else{
      return 0;
    }
  }),

  iscreateSaleButtonEnabled: Ember.computed( 'totalprice' , 'asset'   ,  function() {
    if( Ember.isEmpty(this.get('totalprice'))||
     Ember.isEmpty(this.get('asset'))
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
            asset :controller.get('asset'),
            downpayment :controller.get('downpayment'),
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


          controller.set('asset','');
          controller.set('downpayment','');
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
       asset :controller.get('asset'),
       downpayment :controller.get('downpayment'),
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
     controller.set('asset','');
     controller.set('downpayment','');
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
        asset :controller.get('asset'),
        downpayment :controller.get('downpayment'),
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
        controller.set('asset','');
        controller.set('downpayment','');

      controller.transitionToRoute('dashboard.sales.index');
      });
  });
}






    }
  }
});
