import Ember from 'ember';

export default Ember.Controller.extend({

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


statuses :["Select","Pending", "Sold" , "Rejected"],


actions:{
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

      controller.transitionToRoute('dashboard.enquiry-forms.enquiry-form.view' , enquiry);

  },



  updateEnquiry:function(){
    var enquiry = this.get('enquiry');
    enquiry.save();
  }
}
});
