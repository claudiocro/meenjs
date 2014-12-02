import Ember from 'ember';
import AuthLoginController from 'simple-auth/mixins/login-controller-mixin';
import ServerErrorController from '../mixins/server-error-controller-mixin';


export default Ember.Controller.extend(AuthLoginController, ServerErrorController, {
  authenticator: 'authenticator:signin',
  actions: {
    // display an error when authentication fails
    authenticate: function() {
      var _this = this;
      this._super().then(null, function(error) {
        _this.set('serverErrorMessage', error.message);
      });
    }
  }
});
