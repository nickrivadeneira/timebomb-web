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
    $(view.render().el).hide().prependTo('#bomb-list').slideDown();
  },

  createOnSubmit: function(event){
    // Return if fields are empty.
    if(this.$formInputs.filter(function(){return this.value === "";}).length){
      return;
    }

    var newBomb = new Bomb(this.newAttributes());
    if(newBomb.isValid()){
      newBomb.save({}, {
        success: function(){
          appView.renderAlert('Bomb successfully created!', 'success');
          this.$formInputs.each(function(formField){
            $(formField).val('');
          });
          this.bombs.add(newBomb);
        },
        error: function(){
          appView.renderAlert('Something has gone wrong.', 'danger');
        }
      })
    }else{
      appView.renderAlert(newBomb.validationError, 'danger');
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