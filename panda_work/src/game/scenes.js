game.module(
	'game.scenes'
)
.body(function() {

  game.createScene('Main', {

    init: function() {
      this.world = new game.World();

      this.mainContainer = new game.Container().addTo(this.stage);
      this.mainContainer.scale.set(1.5, 1.5);
      this.mainContainer.position.set(1, -400);

        bg = new game.TilingSprite('background.jpg');
        bg.addTo(this.mainContainer);
        this.addObject(bg);

      this.playerContainer = new game.Container().addTo(this.stage);

      this.player = new game.Player();
      this.player.sprite.addTo(this.playerContainer);
    },

    keydown: function(key) {
      var punchOrKick = Math.floor(Math.random() * 2);
      if (game.keyboard.down('LEFT')){
        if (punchOrKick === 1){
          this.player.punchLeft;
          console.log("Punch!");
        }
        else{
          this.player.kickLeft;
          console.log("Kick!");
        }

        bg.speed.x = 1000;
        setTimeout(function(){
          bg.speed.x = 0;
        }, 50)

        console.log('Left');
      }
      else if (game.keyboard.down('RIGHT')){
        if (punchOrKick === 1){
          this.player.punchLeft;
          console.log("Punch!");
        }
        else{
          this.player.kickLeft;
          console.log("Kick!");
        }

        bg.speed.x = -1000;
        setTimeout(function(){
          bg.speed.x = 0;
        }, 50)

        console.log('Right');
      }
      else if (game.keyboard.down('SPACE')){
        console.log('Space');
      }
    }


});

});
