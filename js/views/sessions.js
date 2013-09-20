SigninView = Backbone.View.extend({
  template: _.template($('#signin-template').html()),
  render: function(){
    $('#timebombapp').html(this.template());
  }
});

SignupView = Backbone.View.extend({
  template: _.template($('#signup-template').html()),
  render: function(){
    $('#timebombapp').html(this.template());
  }
})