AppView = Backbone.View.extend({

});


var sync = Backbone.sync;
Backbone.sync = function(method, model, options) {
  options.headers || (options.headers = {});
  _.extend(options.headers, { 'Authorization': 'RWh2RWWpAFpBGklr-DvP4Q' });
  sync.call(model, method, model, options);
};