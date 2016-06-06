import Ember from 'ember';

export default Ember.Controller.extend({
statuses :["Select","Pending", "Sold" , "Rejected"],


actions:{
  selectStatus(status) {
  this.set('status', status);
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

      followup.save().then(function(){
        controller.set('date','');
        controller.set('message','');
        controller.set('followupdate','');
        controller.set('remarks','');
      });

  }
}
});
