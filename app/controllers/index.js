import Ember from 'ember';

export default Ember.ArrayController.extend({

  newRecord: null,
  actions: {
    new: function() {
      // Create the new Todo model
       this.set('newRecord', this.store.createRecord('product', {
          modelNumber: 'mn',
          name: 'title',
        })
       );
    },
    save: function(){
      this.get('newRecord').save();
    },
    delete: function(product) {
      product.deleteRecord();
      product.save();
    }
  }
});
