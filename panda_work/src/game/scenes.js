game.module(
	'game.scenes'
)
.body(function() {

  game.createScene('Main', {

    init: function() {
      // Creates physics world
      this.world = new game.World(0, 2000);

      // Create background
      bg = new game.TilingSprite('background.jpg');
      this.addObject(bg);
      this.stage.addChild(bg);
      bg.scale.set(1.2, 1.2);
      bg.position.set(1, -100);

      // Create ground
      // Image
      ground = new game.TilingSprite('ground.png');
      ground.scale.set(1.2, 1.2);
      ground.position.set(0, 780);
      this.addObject(ground);
      this.stage.addChild(ground);

      // Physics
      var groundBody = new game.Body({
            position: {
                x: game.system.width / 2,
                y: game.system.height - 250
            },
            collisionGroup: 0
        });
      var groundShape = new game.Rectangle(game.system.width + 500, 50);
      groundBody.addShape(groundShape);
      this.world.addBody(groundBody);

      // Spawn player
      this.playerContainer = new game.Container().addTo(this.stage);
      this.player = new game.Player();
      this.player.sprite.addTo(this.playerContainer);

      // Spawn enemy
      var that = this;
      setInterval(function(){
        that.enemySpawn();
      }, 1000)
    },

    keydown: function(key) {
      var punchOrKick = Math.floor(Math.random() * 2);
      if (game.keyboard.down('LEFT')){
        if (punchOrKick === 1){
          this.player.punchLeft();
          console.log("Punch!");
        }
        else{
          this.player.kickLeft();
          console.log("Kick!");
        }

        bg.speed.x = 1000;
        ground.speed.x = 800;
        setTimeout(function(){
          bg.speed.x = 0;
          ground.speed.x = 0;
        }, 100)

        console.log('Left');
      }
      else if (game.keyboard.down('RIGHT')){
        if (punchOrKick === 1){
          this.player.kickRight();
          console.log("Punch!");
        }
        else if (punchOrKick === 0){
          this.player.punchRight();
          console.log("Kick!");
        }

        bg.speed.x = -1000;
        ground.speed.x = -800;
        setTimeout(function(){
          bg.speed.x = 0;
          ground.speed.x = 0;
        }, 100)

        console.log('Right');
      }
      else if (game.keyboard.down('SPACE')){
        console.log('Space');
      }
    },

    enemySpawn: function(){
      // Spawn enemy
      var enemy = new game.EnemyLeft();
      this.enemyContainer = new game.Container().addTo(this.stage);
      this.enemyLeft = new game.EnemyLeft();
      this.enemyLeft.sprite.addTo(this.enemyContainer);
    }


});

});
