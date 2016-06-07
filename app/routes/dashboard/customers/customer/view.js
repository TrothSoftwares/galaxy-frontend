import Ember from 'ember';

export default Ember.Route.extend({



  model: function() {
    return Ember.RSVP.hash({
    customer: this.modelFor('dashboard.customers.customer'),
  });

  },

  setupController: function(controller ,model) {
    controller.set('customer',model.customer);
  }
});
