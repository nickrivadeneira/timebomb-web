TimebombRouter = Backbone.Router.extend({
  routes: {
    'signup': 'signup',
    'signin': 'signin',
    'bombs': 'viewBombIndex',
    'bombs/:id': 'viewBombShow'
  },

  signup: function(){
    this.signupView = new SignupView;
    this.signupView.render();
  },
  signin: function(){
    this.signinView = new SigninView;
    this.signinView.render();
  },
  viewBombIndex: function(){
    this.bombIndexView = new BombsView;
    this.bombIndexView.render();
  },
  viewBombShow: function (id){
    this.bombShowView = new BombShowView;
    this.bombShowView.render();
  }
})

var myTimebombRouter = new TimebombRouter();

Backbone.history.start();