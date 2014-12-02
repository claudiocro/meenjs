import Ember from 'ember';
import BaseAuthorizers from 'simple-auth/authorizers/base';

export default BaseAuthorizers.extend({
  authorize: function(jqXHR) {
    if (this.get('session.isAuthenticated') && !Ember.isEmpty(this.get('session.token'))) {
      jqXHR.setRequestHeader('Authorization', 'Bearer ' + this.get('session.token'));
    }
  }
});
