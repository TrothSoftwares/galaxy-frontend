import Ember from 'ember';

export default Ember.Route.extend({



  model: function() {
    return Ember.RSVP.hash({
    enquiry: this.modelFor('dashboard.enquiry-forms.enquiry-form'),
  });

  },

  setupController: function(controller ,model) {
    controller.set('enquiry',model.enquiry);
  }
});
