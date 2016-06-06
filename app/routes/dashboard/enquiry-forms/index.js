import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {

    return Ember.RSVP.hash({
     enquiries: this.store.findAll('enquiry' ,{reload: true}).then(function(enquiries){
          return {
            pendingEnquiries:  enquiries.filterBy('status', 'Pending')
        };
     }),
   });
  },

  setupController: function(controller ,model) {

      controller.set('enquiries',model.enquiries);
      controller.set('pendingEnquiries',model.enquiries.pendingEnquiries);

  }
});
