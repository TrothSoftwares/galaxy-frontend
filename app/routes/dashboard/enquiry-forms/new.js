import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {



    return Ember.RSVP.hash({
    employees: this.store.findAll('employee'),
  });
  },





  setupController: function(controller ,model) {
       controller.set('employees',model.employees);
  }
});
