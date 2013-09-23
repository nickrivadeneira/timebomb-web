TimebombRouter = Backbone.Router.extend({
  routes: {
    'signup': 'signup',
    'signin': 'signin',
    'signout': 'signout',
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
  signout: function(){
    localStorage.removeItem('token');
    this.signin();
  },
  viewBombIndex: function(){
    if(this.authenticate()){
      this.bombIndexView = new BombsView;
      this.bombIndexView.render();
    }
  },
  viewBombShow: function (id){
    if(this.authenticate()){
      this.bombShowView = new BombShowView;
      this.bombShowView.render();
    }
  },
  authenticate: function(){
    if(localStorage.token){
      return true;
    }else{
      this.signin();
      return false;
    }
  }
})

var myTimebombRouter = new TimebombRouter();

Backbone.history.start();