import Ember from 'ember';
import SignupAuthenticator from './signup';


export default SignupAuthenticator.extend({
  store: null,
  tokenEndpoint: '/auth/signin',
  //tokenEndpoint: 'http://localhost:4201/auth/signin',

  authenticate: function(credentials) {
    var _this = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        url:         _this.tokenEndpoint,
        type:        'POST',
        data:        JSON.stringify({username: credentials.identification, password: credentials.password }),
        contentType: 'application/json'
      }).then(function(response) {
        Ember.run(function() {
          var user = _this.store.push('user', response.user);
          resolve({
            user: user,
            token: response.user.token
          });

        });
      }, function(xhr/*, status, error*/) {
        var response = JSON.parse(xhr.responseText);
        Ember.run(function() {
          reject(response);
        });
      });
    });
  }
});
