TimebombRouter = Backbone.Router.extend({
  routes: {
    'signup': 'signup',
    'signin': 'signin',
    'signout': 'signout',
    'bombs': 'viewBombIndex',
    'bombs/:id': 'viewBombShow'
  },

  signup: function(){
    if(!this.signedIn()){
      this.signupView = new SignupView;
      this.signupView.render();
    }
  },
  signin: function(){
    if(!this.signedIn()){
      this.signinView = new SigninView;
      this.signinView.render();
    }else{
      this.viewBombIndex();
    }
  },
  signout: function(){
    localStorage.removeItem('token');
    this.signin();
  },
  viewBombIndex: function(){
    if(this.signedIn(true)){
      this.bombIndexView = new BombsView;
      this.bombIndexView.render();
    }
  },
  viewBombShow: function (id){
    if(this.signedIn(true)){
      this.bombShowView = new BombShowView;
      this.bombShowView.render();
    }
  },
  signedIn: function(authenticate){
    if(localStorage.token){
      return true;
    }else{
      if(authenticate){this.signin();}
      return false;
    }
  }
})

var myTimebombRouter = new TimebombRouter();

Backbone.history.start();