import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {

    return Ember.RSVP.hash({
     sales: this.store.findAll('sale' ,{reload: true}).then(function(sales){
          return {
            salesPending:  sales.filterBy('status', 'Incomplete'),
            salesHistory:  sales.filterBy('status', 'Completed'),
        };
     }),
   });
  },

  setupController: function(controller ,model) {

      controller.set('sales',model.sales);
      controller.set('salesPending',model.sales.salesPending);
      controller.set('salesHistory',model.sales.salesHistory);

  }
});
