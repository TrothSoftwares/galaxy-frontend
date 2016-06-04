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
      this.route('enquiry-form', function() {
        this.route('view');
        this.route('edit');
      });
    });
  });
});

export default Router;
