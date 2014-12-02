export default {
  name: 'authsessionuser',
  before: 'simple-auth',
  after: 'ember-data',
  //after: ["ember-data", "simple-auth"],

  initialize: function(container, application) {
    application.inject('authenticator', 'store', 'store:main');
  }
};
