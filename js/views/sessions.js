SigninView = Backbone.View.extend({
  el: '#timebombapp',
  events: {
    'click #signin-submit': 'signinSubmit',
  },
  template: _.template($('#signin-template').html()),
  signinSubmit: function(event){
    appView.clearAlerts();
    // Return on empty sign-in fields
    if($('.signin-field').filter(function(){return this.value === "";}).length){
      return false;
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
          localStorage.token = JSON.parse(data)[0].token;
          myTimebombRouter.viewBombIndex();
        },
        error: function(request){
          if(request.status == 401){
            appView.renderAlert('Invalid username/password combination.', 'danger');
          }else{
            appView.renderAlert('Something has gone wrong.', 'danger');
          }
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