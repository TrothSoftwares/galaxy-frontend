import Ember from 'ember';

export default Ember.Controller.extend({

  ajax: Ember.inject.service(),

  enableNewSale:false,

  isCreateFollowupButtonDisabled: Ember.computed( 'message'   ,  function() {
    if( Ember.isEmpty(this.get('message'))
  ){return 'disabled';}
  else{return '';}
  }),


  isupdateEnquiryButtonDisabled: Ember.computed( 'enquiry.name'   ,  function() {
    if( Ember.isEmpty(this.get('enquiry.name'))
  ){return 'disabled';}
  else{return '';}
  }),


  iscreateSaleButtonEnabled: Ember.computed( 'totalprice'   ,  function() {
    if( Ember.isEmpty(this.get('totalprice'))
  ){return 'disabled';}
  else{return '';}
  }),

  months : Ember.computed('totalprice','installpricepermonth',function(){
    if(this.get('totalprice')&&this.get('installpricepermonth') ){
     return parseInt(this.get('totalprice') / parseInt(this.get('installpricepermonth')));
   }
    else{
      return 0;
    }
  }),


statuses :["Select","Pending", "Sold" , "Rejected"],


actions:{


  searchRepo(term) {
          if (Ember.isBlank(term)) { return []; }

          const url = `//zahid-backend.herokuapp.com/products?direction=asc&page=1&productname=${term}`;
          // const url = `//api.github.com/search/repositories?q=${term}`;
          // return this.get('ajax')({ url }).then(json => json.items);

          return this.get('ajax').request(url).then(json=>json.data);
        },


  openNewSale:function(){
    this.toggleProperty('enableNewSale');
  },
  selectStatus(status) {
  this.get('enquiry').set('status', status);
  },

  updateFollowup:function(){
    var controller = this;
    var enquiry = this.get('enquiry');

    var followup = this.store.createRecord('followup', {
        date :this.get('date'),
        message :this.get('message'),
        followupdate :this.get('followupdate'),
        enquiry :enquiry,
        remarks :this.get('remarks')
      });

      enquiry.save();

      followup.save().then(function(){
        controller.set('date','');
        controller.set('message','');
        controller.set('followupdate','');
        controller.set('remarks','');
      });
      controller.transitionToRoute('dashboard.enquiry-forms.enquiry-form.view', enquiry);

      controller.notifications.addNotification({
      message: 'Saved!' ,
      type: 'success',
      autoClear: true
      });
      controller.transitionToRoute('dashboard.enquiry-forms.enquiry-form.view' , enquiry);

  },



  updateEnquiry:function(){
    var controller = this;
    var enquiry = this.get('enquiry');
    enquiry.save();

    controller.notifications.addNotification({
    message: 'Saved!' ,
    type: 'success',
    autoClear: true
  });
},



closeSupplierModal: function(){
    Ember.$('.ui.newsale.modal')
    .modal('hide')
    ;
  },

  openSupplierModal: function(){
    Ember.$('.ui.newsupplier.modal')
    .modal('show')
    ;
  },



sellToEnquiry:function(){


  var controller = this;
  this.get('enquiry').set('status','Sold');
  var customer = controller.store.createRecord('customer', {
    name :this.get('enquiry.name'),
    address :this.get('enquiry.address'),
    contact :this.get('enquiry.contact'),
    email :this.get('enquiry.email')
  });
  customer.save().then(function(){

    var   sale = controller.store.createRecord('sale', {

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
        controller.set('enableNewSale',false);

      controller.transitionToRoute('dashboard.sales.index');
      });
  });
}



}

});
