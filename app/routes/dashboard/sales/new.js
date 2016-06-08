import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
    enquiries: this.store.findAll('enquiry'),
    customers: this.store.findAll('customer'),
  });
  },





  setupController: function(controller ,model) {
       controller.set('customers',model.customers);
       controller.set('enquiries',model.enquiries);
  }
});
