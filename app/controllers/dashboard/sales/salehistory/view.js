import Ember from 'ember';

export default Ember.Controller.extend({



ismarkCompletedButtonActive: Ember.computed( 'sale.balanceamount'   ,  function() {
  if(this.get('sale.balanceamount') !== 0)
  {return 'disabled';}
  else{return '';}
  }),



  isupdateSaleButtonEnabled: Ember.computed( 'sale.totalprice'   ,  function() {
    if( Ember.isEmpty(this.get('sale.totalprice'))
  ){return 'disabled';}
  else{return '';}
  }),


  reverse: function(){
    return this.get('sale').get('installments').toArray().reverse();
}.property('sale.@each'),


  actions:{
    editCustomer:function(){
      Ember.$('.customerview').transition('hide');
      Ember.$('.customeredit').transition('show');
    },
    saveCustomer:function(){
      var controller = this;
      var customer = controller.get('sale.customer').get('content');

        customer.save().then(function(){
          Ember.$('.customerview').transition('show');
          Ember.$('.customeredit').transition('hide');
        }).catch(function(){
          controller.notifications.addNotification({
            message: 'Sorry, cant save at the moment !' ,
            type: 'error',
            autoClear: true
          });
        });

    },

    updateSale:function(){
      var controller = this;
      var sale = this.get('sale');
      sale.save().then(function(){

        var installments = sale.get('installments');
          installments.forEach(function(installment){
            installment.save().then(function(){

            }).catch(function(){
              controller.notifications.addNotification({
                message: 'Sorry, cant save at the moment !' ,
                type: 'error',
                autoClear: true
              });
            });
          });


        controller.notifications.addNotification({
          message: 'Saved' ,
          type: 'success',
          autoClear: true
        });

      });


    },


    newInstallment:function(){
      var controller = this;
       var sale = this.get('sale');
      var installment = this.store.createRecord('installment',{
        amount: 0,
        date: new Date(),
        sale: sale
      });
      installment.save().then(function(){
        controller.get('reverse').unshiftObject(installment);
      });
    },

    deleteInstallment:function(installment){
      installment.destroyRecord();
    },

    markCompleted:function(){
      var sale = this.get('sale');
      sale.set('status','Completed');
      sale.save();
    }


  }


});
