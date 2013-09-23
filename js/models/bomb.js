Bomb = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: 'http://localhost:9292/bombs',
  validate: function(attributes){
    if(!attributes.timestamp){
      return 'A timestamp is required.';
    }

    if(!attributes.url){
      return 'A URL is required.';
    }

    if(!attributes.request_params){
      return 'Request parameters are required.';
    }

    try{
      JSON.parse(attributes.request_params);
    }catch(err){
      return 'JSON is invalid.';
    }
  }
});