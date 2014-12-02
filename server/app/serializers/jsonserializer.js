
function JSONSerializer(config) {

  this.primaryKey = 'id';
  this.attrs = {};

  if(config.primaryKey !== undefined) {
    this.primaryKey = config.primaryKey;
  }
}


JSONSerializer.prototype.serialize = function(record, options) {
  var json = {};

  if (options && options.includeId) {
    var id = get(record, 'id');

    if (id) {
      json[get(this, 'primaryKey')] = id;
    }
  }

  record.eachAttribute(function(key, attribute) {
    this.serializeAttribute(record, json, key, attribute);
  }, this);

  record.eachRelationship(function(key, relationship) {
    if (relationship.kind === 'belongsTo') {
      this.serializeBelongsTo(record, json, relationship);
    } else if (relationship.kind === 'hasMany') {
      this.serializeHasMany(record, json, relationship);
    }
  }, this);

  return json;
}



