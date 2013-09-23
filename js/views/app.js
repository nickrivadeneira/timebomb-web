AppView = Backbone.View.extend({
  el: '#timebombapp',
  renderAlert: function(message, alertType){
    alertType || (alertType = "info");
    this.clearAlerts();
    $('<div class="alert alert-' + alertType + '">' + message + '</div>').hide().prependTo(this.el).fadeIn();
  },
  clearAlerts: function(){
    $('.alert').remove();
  }
});


var sync = Backbone.sync;
Backbone.sync = function(method, model, options) {
  options.headers || (options.headers = {});
  _.extend(options.headers, { 'Authorization': localStorage.token });
  sync.call(model, method, model, options);
};