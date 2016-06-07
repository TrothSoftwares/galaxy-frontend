import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
    enquiries: this.store.findAll('enquiry'),
  });
  },





  setupController: function(controller ,model) {
       controller.set('enquiries',model.enquiries);
  }
});
