import Ember from 'ember';

export function incrementone(inputone , inputtwo) {
  var output=inputone + inputtwo;
  return output;
}

export default Ember.Helper.helper(incrementone);
