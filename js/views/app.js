AppView = Backbone.View.extend({
  el: '#timebombapp',
  events: {
    'click #new-bomb-submit': 'createOnSubmit',
  },

  initialize: function(){
    this.bombs = new Bombs(null, {view: this});
    this.listenTo(this.bombs, 'add', this.addOne);
    this.bombs.fetch();

    this.$urlInput        = this.$('#new-bomb-url');
    this.$timestampInput  = this.$('#new-bomb-timestamp');
    this.$paramsInput     = this.$('#new-bomb-request-params');
    this.$formInputs      = this.$('.new-bomb-field');
  },

  addOne: function(bomb){
    var view = new BombView({model: bomb});
    $('#bomb-list').append(view.render().el);
  },

  createOnSubmit: function(event){
    if(this.$formInputs.filter(function(el){return el.value === "";}).length){
      return;
    }

    this.bombs.create(this.newAttributes(), {wait: true});
    this.$formInputs.each(function(el){
      $(el).val('');
    })
  },

  newAttributes: function(){
    return {
      url: this.$urlInput.val().trim(),
      timestamp: this.$timestampInput.val().trim(),
      request_params: this.$paramsInput.val().trim()
    };
  }
});


var sync = Backbone.sync;
Backbone.sync = function(method, model, options) {
  options.headers || (options.headers = {});
  _.extend(options.headers, { 'Authorization': 'RWh2RWWpAFpBGklr-DvP4Q' });
  sync.call(model, method, model, options);
};