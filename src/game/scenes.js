game.module(
	'game.scenes'
)
.body(function() {

  game.createScene('Main', {
    init: function() {
      // Create menu background
      bg = new game.Sprite('images/backgrounds/the_girls.jpg');
      this.addObject(bg);
      this.stage.addChild(bg);
      bg.anchor.set(.5, .5)
      bg.scale.set(1, 1);
      bg.position.set(game.system.width/2, game.system.height/2)

      // Create menu logo
      logo = new game.Sprite('images/backgrounds/logo.png')
      this.addObject(logo);
      this.stage.addChild(logo);
      logo.anchor.set(.5, .5)
      logo.scale.set(.5, .5);
      logo.position.set(game.system.width * .54, game.system.height * .17)
      var tween = new game.Tween(logo.scale);
        tween.to({x:.55, y:.55}, 685);
        tween.repeat();
        tween.yoyo();
        tween.start();

      // Add play button
      var playButton = new game.Sprite('images/play_button.png');
      playButton.interactive = true;
      playButton.buttonMode = true;
      playButton.click = function(){
        game.system.setScene('Game');
      }
      playButton.mouseover = function(){
        playButton.scale.set(1.6, 1.6);
      }
      playButton.mouseout = function(){
        playButton.scale.set(1.5, 1.5);
      }
      playButton.scale.set(1.5, 1.5)
      playButton.anchor.set(.5, .5);
      playButton.position.set(1010, 450);
      this.stage.addChild(playButton);

      // Add music
      game.audio.playMusic('ppg_theme');
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
      bg = new game.TilingSprite('images/backgrounds/townsville_2.png');
      this.addObject(bg);
      this.stage.addChild(bg);
      bg.scale.set(1.45, 1.45);
      bg.position.set(1, -400);

      // Create ground
      // Image
      ground = new game.TilingSprite('images/backgrounds/ground.png');
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
      var randomSprite = function(){
        var randNum = Math.floor(Math.random()*3);
        if (randNum === 0){
          return new game.Blossom();
        }
        else if (randNum === 1){
          return new game.Bubbles();
        }
        else if (randNum === 2){
          return new game.Buttercup();
        }

      }
      this.playerContainer = new game.Container().addTo(this.stage);
      this.player = randomSprite();
      this.player.sprite.addTo(this.playerContainer)

      // Set attack state
      attacking = false

      var that = this;
      // Spawn enemy
      setTimeout(function(){
        var randNum = Math.floor(Math.random()*500)+400
        spawnTimer = setInterval(function(){
          that.enemySpawn();
        }, randNum)
      }, 1500)

      // Difficulty increase
      // setInterval(function(){
      //   setTimeout(function(){
      //     var randNum = Math.floor(Math.random()*5000)+10000
      //     spawnTimer = setInterval(function(){
      //       that.enemySpawn();
      //     }, randNum)
      //   }, 1500)
      // }, 10000)

      // Add start text
      this.introText1 = new game.BitmapText('The city of Townsville', {font:'powerpuff'});
      this.introText1.position.set(120, 300);
      this.introText1.scale.set(1.8, 1.8);
      this.stage.addChild(this.introText1);
      this.introText2 = new game.BitmapText('is under attack!', {font:'powerpuff'});
      this.introText2.position.set(380, 450);
      this.introText2.scale.set(1.8, 1.8);
      this.stage.addChild(this.introText2);
      var that = this;
      setTimeout(function(){
        that.introText1.remove();
        that.introText2.remove();
      }, 3000)

      // Create score text
      this.score = new game.BitmapText('Score - ' + this.player.hitScore, {font:'powerpuff'});
      this.score.position.set(50, 50)
      this.stage.addChild(this.score);

      // Update score text
      setInterval(function(){
          that.scoreUpdate();
      }, 10)

      // Check if dead
      isDead = setInterval(function(){
          that.deathUpdate();
      }, 10)
    },

    keydown: function(key) {
      var randSound = function(){
          var randNum = Math.floor(Math.random()*5);
          switch (randNum){
            case 0:
              return 'attack_sound_1';
              break;
            case 1:
              return 'attack_sound_2';
              break;
            case 2:
              return 'attack_sound_3';
              break;
            case 3:
              return 'attack_sound_4';
              break;
            case 4:
              return 'attack_sound_5';
              break;
            default:
              break;
          }
        }
      var punchOrKick = Math.floor(Math.random() * 2);
      if (game.keyboard.down('LEFT')){
          if (attacking === false){
              game.audio.playSound(randSound());
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
            game.audio.playSound(randSound());
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
      this.score.setText('Score - ' + this.player.hitScore);
    },

    deathUpdate: function(){
      if (this.player.deathCounter >= 5){
        // Stop spawning enemies
        clearTimeout(spawnTimer)
        // Stop checking if dead
        clearTimeout(isDead)
        // Play sad noise
        var youDied = game.audio.playSound('sad_trombone');
        game.audio.setVolume(youDied, 1.7);
        // Add reset text
        var that = this;
        setTimeout(function(){
          that.gameOver1 = new game.BitmapText('Dang, that looked', {font:'powerpuff'});
          that.gameOver1.position.set(370, 150);
          that.gameOver1.scale.set(1.8, 1.8);
          that.stage.addChild(that.gameOver1);
          that.gameOver2 = new game.BitmapText('painful!', {font:'powerpuff'});
          that.gameOver2.position.set(700, 300);
          that.gameOver2.scale.set(1.8, 1.8);
          that.stage.addChild(that.gameOver2);

          // Add retry button
          var retryButton = new game.Sprite('images/play_again_button.png');
          retryButton.interactive = true;
          retryButton.buttonMode = true;
          retryButton.mousedown = function(){
            document.location.reload(true);
          }
          // retryButton.mouseover = function(){
          //   retryButton.scale.set(1.6, 1.6);
          // }
          // retryButton.mouseout = function(){
          //   retryButton.scale.set(1.5, 1.5);
          // }
          retryButton.scale.set(1.5, 1.5)
          retryButton.anchor.set(.5, .5);
          retryButton.position.set(1010, 550);
          that.stage.addChild(retryButton);
        }, 500)

      }
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
