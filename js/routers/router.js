TimebombRouter = Backbone.Router.extend({
  routes: {
    'signup': 'signup',
    'signin': 'signin',
    'bombs': 'viewBombIndex',
    'bombs/:id': 'viewBombShow'
  },

  signup: function(){console.log('signup route')},
  signin: function(){this.signinView = new SigninView; this.signinView.render()},
  viewBombIndex: function(){console.log('bomb index route')},
  viewBombShow: function (id){console.log('bomb show route')}
})

var myTimebombRouter = new TimebombRouter();

Backbone.history.start();