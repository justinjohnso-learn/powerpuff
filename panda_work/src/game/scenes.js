game.module(
	'game.scenes'
)
.body(function() {

  game.createScene('Main', {
    init: function() {
      game.scene.clear('Game');
      game.scene.exit('Game');
      // Create menu background
      bg = new game.Sprite('backgrounds/the_girls.jpg');
      this.addObject(bg);
      this.stage.addChild(bg);
      bg.anchor.set(.5, .5)
      bg.scale.set(1, 1);
      bg.position.set(game.system.width/2, game.system.height/2)

      // Create menu logo
      logo = new game.Sprite('backgrounds/logo.png')
      this.addObject(logo);
      this.stage.addChild(logo);
      logo.anchor.set(.5, .5)
      logo.scale.set(.5, .5);
      logo.position.set(game.system.width * .54, game.system.height * .2)
      var tween = new game.Tween(logo.scale);
        tween.to({x:.55, y:.55}, 685);
        tween.repeat();
        tween.yoyo();
        tween.start();

      // Add music
      game.audio.playMusic('ppg_theme');

      setTimeout(function(){
      //   game.system.setScene('Game');
      }, 1000)
    }
  });

  game.createScene('Game', {
    init: function() {
      // Add music
      game.audio.playMusic('ppg_fight_intro');
      setTimeout(function(){
        game.audio.playMusic('ppg_fight');
      }, 8400)

      // Creates physics world
      this.world = new game.World(0, 2000);

      // Create background
      bg = new game.TilingSprite('backgrounds/townsville_2.png');
      this.addObject(bg);
      this.stage.addChild(bg);
      bg.scale.set(1.45, 1.45);
      bg.position.set(1, -400);

      // Create ground
      // Image
      ground = new game.TilingSprite('backgrounds/ground.png');
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

      var that = this;
      // Spawn enemy
      spawnTimer = setInterval(function(){
        that.enemySpawn();
      }, 600)

      // Create score text
      this.score = new game.BitmapText('Hit Score: ' + this.player.hitScore, {font:'FridgeMagnets'});
      this.score.position.set(50, 50)
      this.stage.addChild(this.score);

      // Update score text
      setInterval(function(){
          that.scoreUpdate();
      }, 10)

      // Check if dead
      setInterval(function(){
          that.deathUpdate();
      }, 10)
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
              }, 150)

              setTimeout(function(){
                attacking = false;
              }, 100)
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
              }, 150)

              setTimeout(function(){
                attacking = false;
              }, 100)
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

    scoreUpdate: function(){
      this.score.setText('Hit Score: ' + this.player.hitScore);
    },

    deathUpdate: function(){
      if (this.player.deathCounter >= 5){
        clearTimeout(spawnTimer)
        var that = this;
        // setTimeout(function(){
        //   game.audio.stopMusic('ppg_fight');
        //   game.system.setScene('Main');
        // }, 3000)
      }
    },

    gameReset: function(){

    }

  });

  // game.createScene('End', {
  //   init: function() {
  //     setTimeout(function(){
  //         game.system.setScene('End');
  //       }, 1000)
  //   }
  // })


});
