game.module(
	'game.scenes'
)
.body(function() {

  game.createScene('Main', {
    init: function() {
      // Creates physics world
      this.world = new game.World(0, 2000);


      // Create background
      bg = new game.TilingSprite('townsville_2.png');
      this.addObject(bg);
      this.stage.addChild(bg);
      bg.scale.set(1.45, 1.45);
      bg.position.set(1, -400);

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
      this.player.sprite.addTo(this.playerContainer)
      // Set attack state
      attacking = false

      // Spawn enemy
      var that = this;
      setInterval(function(){
        that.enemySpawn();
      }, 500)
      this.scoreDisplay();
    },

    keydown: function(key) {
      var punchOrKick = Math.floor(Math.random() * 2);
      if (game.keyboard.down('LEFT')){
          if (attacking === false){
              attacking = true
              if (punchOrKick === 1){
                this.player.punchLeft();
              }
              else{
                this.player.kickLeft();
              }

              bg.speed.x = 800;
              ground.speed.x = 600;
              setTimeout(function(){
                bg.speed.x = 0;
                ground.speed.x = 0;
                attacking = false;
              }, 150)
          }
          else{
            return;
          }
      }
      else if (game.keyboard.down('RIGHT')){
         if (attacking === false){
            attacking = true
            if (punchOrKick === 1){
              this.player.kickRight();
            }
            else if (punchOrKick === 0){
              this.player.punchRight();
            }

            bg.speed.x = -800;
            ground.speed.x = -600;
            setTimeout(function(){
              bg.speed.x = 0;
              ground.speed.x = 0;
              attacking = false;
            }, 150)
        }
      }
      // else if (game.keyboard.down('SPACE')){
      // }
    },

    enemySpawn: function(){
      var randNum = Math.floor(Math.random()*2);
      if (randNum === 0){
        // Spawn enemyLeft
        var enemy = new game.EnemyLeft();
        this.enemyContainer = new game.Container().addTo(this.stage);
        this.enemyLeft = new game.EnemyLeft();
        this.enemyLeft.sprite.addTo(this.enemyContainer);
      }
      else {
        // Spawn enemyRight
        var enemy = new game.EnemyRight();
        this.enemyContainer = new game.Container().addTo(this.stage);
        this.enemyRight = new game.EnemyRight();
        this.enemyRight.sprite.addTo(this.enemyContainer);
      }
    },

    scoreDisplay: function(){
      // Add text
      var text = new game.BitmapText('Hit Score: ' + this.player.hitScore, {font:'FridgeMagnets'});
      text.position.set(game.system.width/2, 200)
      this.stage.addChild(text);
    }

});

});
