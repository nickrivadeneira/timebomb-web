SigninView = Backbone.View.extend({
  el: '#timebombapp',
  events: {
    'click #signin-submit': 'signinSubmit',
  },
  template: _.template($('#signin-template').html()),
  signinSubmit: function(event){
    // Return on empty sign-in fields
    if($('.signin-field').filter(function(){return this.value === "";}).length){
      return;
    }

    var email = $('#email').val().trim();
    var password = $('#password').val().trim();
    if(email != "" && password != ""){
      $.ajax({
        url: 'http://localhost:9292/tokens',
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', 'Basic ' + Base64.encode(email + ':' + password));
        },
        success: function(data){
          token = JSON.parse(data)[0].token;
          console.log(token);
        }
      });
    }
    return false;
  },

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