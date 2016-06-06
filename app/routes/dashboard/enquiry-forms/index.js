import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {

    return Ember.RSVP.hash({
      enquiries: this.store.findAll('enquiry' ,{reload :true})
    });
  },

  setupController: function(controller,model) {
    controller.set('enquiries',model.enquiries);
  },

});
