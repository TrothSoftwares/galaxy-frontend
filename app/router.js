import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('dashboard', {path: '/'}, function() {
    this.route('enquiry-forms', function() {
      this.route('new');
      this.route('enquiry-form', {path: ':id'}, function() {
        this.route('view');
        this.route('edit');
      });
    });
    this.route('customers', function() {
      this.route('new');
      this.route('customer', {path: ':id'},  function() {
        this.route('edit');
        this.route('view');
      });
    });
    this.route('sales', function() {
      this.route('salepending');
      this.route('salehistory');
      this.route('new');
    });
  });
});

export default Router;
