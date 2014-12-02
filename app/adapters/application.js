import DS from "ember-data";


export default DS.RESTAdapter.extend({
    namespace: 'api/1',
    //host: 'http://localhost:4201'
    //host: 'http://localhost:8080'
    /*serializer: DS.RESTSerializer.extend({
      primaryKey: function(type){
        debuggeR;
        return '_id';
      }
    })*/
});
