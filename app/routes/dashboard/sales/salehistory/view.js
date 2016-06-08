import Ember from 'ember';

export default Ember.Route.extend({



  model: function() {
    return Ember.RSVP.hash({
    sale: this.modelFor('dashboard.sales.salehistory'),
  });

  },

  setupController: function(controller ,model) {
    controller.set('sale',model.sale);
  }
});
