Bombs = Backbone.Collection.extend({
  model: Bomb,
  url: 'http://localhost:9292/bombs',
  success: function(collection, model){
    _.each(collection.models, function(model){
      console.log(model.toJSON());
    })
  }
});