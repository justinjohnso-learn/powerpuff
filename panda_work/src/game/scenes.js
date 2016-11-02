game.module(
	'game.scenes'
)
.body(function() {

game.createScene('Main', {
    init: function() {
      var logo = new game.Sprite('logo.png').center().addTo(this.stage);

        var tween = new game.Tween(logo.scale);
        tween.to({x:2, y:2}, 5000);
        tween.repeat();
        tween.yoyo();
        tween.start();
    }
});

});
