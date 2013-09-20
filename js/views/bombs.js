BombView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#item-template').html()),
  render: function(){
    try{
      this.$el.html(this.template(this.model.toJSON()));
    }catch(err){
      this.$el.html("");
    }
    return this;
  }
});

BombsView = Backbone.View.extend({
  el: '#timebombapp',
  events: {
    'click #new-bomb-submit': 'createOnSubmit',
  },
  template: _.template($('#bombs-template').html()),
  initialize: function(){
  },

  addOne: function(bomb){
    var view = new BombView({model: bomb});
    $('#bomb-list').append(view.render().el);
  },

  createOnSubmit: function(event){
    // Return if fields are empty.
    if(this.$formInputs.filter(function(){return this.value === "";}).length){
      return;
    }

    if(this.bombs.create(this.newAttributes(), {wait: true, validate: true})){
      console.log('success');
      this.$formInputs.each(function(formField){
        $(formField).val('');
      })
    }else{
      console.log('failure');
      console.log();
    }
  },

  newAttributes: function(){
    return {
      url: this.$urlInput.val().trim(),
      timestamp: this.$timestampInput.val().trim(),
      request_params: this.$paramsInput.val().trim()
    };
  },

  render: function(){
    $(this.el).html(this.template);
    this.$urlInput        = $('#new-bomb-url');
    this.$timestampInput  = $('#new-bomb-timestamp');
    this.$paramsInput     = $('#new-bomb-request-params');
    this.$formInputs      = $('.new-bomb-field');

    this.bombs = new Bombs(null, {view: this});
    this.listenTo(this.bombs, 'add', this.addOne);
    this.bombs.fetch();
  }
});