import Ember from 'ember';

export default Ember.Controller.extend({

  isCreateEnquiryButtonDisabled: Ember.computed( 'name'   ,  function() {
    if( Ember.isEmpty(this.get('name'))
  ){return 'disabled';}
  else{return '';}
  }),




  statuses :["Select","Issued", "Returned" , "Damaged", "Lost"],

  actions:{
    selectStatus(status) {
    this.set('status', status);
  },


  createEnquiry:function(){
    var controller = this;

    var enquiry = this.store.createRecord('enquiry', {
        name :this.get('name'),
        address :this.get('address'),
        contact :this.get('contact'),
        email :this.get('email'),
        status :this.get('status'),
        followupdate :this.get('followupdate'),
        remarks :this.get('remarks'),
        date :new Date(),
        employee :this.get('employee')
      });


      enquiry.save().then(function(enquiry){
      

          var followup = controller.store.createRecord('followup', {
              date :new Date(),
              message :controller.get('message'),
              followupdate :controller.get('followupdate'),
              enquiry:enquiry
            });

            followup.save();

            controller.set('name','');
            controller.set('address','');
            controller.set('contact','');
            controller.set('email','');
            controller.set('status','');
            controller.set('followupdate','');
            controller.set('remarks','');
            controller.set('date','');
            controller.set('employee','');

          controller.transitionToRoute('dashboard');
        });


  }
  }
});
