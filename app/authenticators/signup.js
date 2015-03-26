import Ember from 'ember';
import BaseAuthenticator from 'simple-auth/authenticators/base';



var SignupAuthenticator = BaseAuthenticator.extend({
  store: null,
  authenticate: function(user) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if(!Ember.isEmpty(Ember.get(user,'token'))) {

        resolve({
          user: user,
          token: Ember.get(user,'token')
        });

      }
      else {
        reject();
      }
    });
  },

  restore: function(data) {
    var self = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (Ember.isEmpty(data.token)) {
        reject();
      } else {
        Ember.$.ajax({
          url: '/auth/token',
          type: 'POST',
          data: JSON.stringify({token: data.token}),
          contentType: 'application/json',
          beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + data.token);
          },
          success: function(sdata) {
            var a = self.store.push('user', sdata.user);
            resolve({
              user: a,
              token: a.get('token')
            });
          },
          error: function() {
            reject();
          }
        });
      }
    });
  },

  invalidate: function() {
   return new Ember.RSVP.resolve();
  }
});


export default SignupAuthenticator;
