game.module(
  'game.objects'
)

.body(function() {

  game.createClass('Player', {
    // Borrowed onGround method from https://github.com/ekelokorpi/panda.js-engine-games/tree/master/endlessrunner
    onGround: false,

    init: function(x, y) {
        // Initializing animations
        this.sprite = game.Animation.fromFrames('blossom_idle');
        this.sprite.scale.set(3.2, 3.2)
        this.sprite.animationSpeed = 0.2;
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.play();

        this.idleAnim = this.sprite.textures;
        this.punchLeftAnim = game.Animation.fromFrames('blossom_punch_left').textures;
        this.kickLeftAnim = game.Animation.fromFrames('blossom_kick_left').textures;
        this.punchRightAnim = game.Animation.fromFrames('blossom_punch_right').textures;
        this.kickRightAnim = game.Animation.fromFrames('blossom_kick_right').textures;
        this.collideLeftAnim = game.Animation.fromFrames('blossom_hit_left').textures;
        this.collideRightAnim = game.Animation.fromFrames('blossom_hit_right').textures;
        this.deathAnim = game.Animation.fromFrames('blossom_die').textures;

        // Initializing physics
        this.body = new game.Body({
          // position: {
          //       x:x,
          //       y:y
          //   },
          mass: 1,
          collisionGroup: 1,
            // 0 = ground
            // 1 = player
            // 2 = enemyLeft
            // 3 = enemyRight
          collideAgainst: [0, 2, 3],
        });

        // var shape = new game.Rectangle(80, 190);
        // this.body.addShape(shape);
        game.scene.world.addBody(this.body);
        game.scene.addObject(this);
        var shape = new game.Rectangle(this.sprite.width, this.sprite.height);
        this.body.addShape(shape);
        // this.body.velocity.x = -this.body.velocityLimit.y;
        this.body.mass = 1;
        this.body.collide = this.collide.bind(this);
        this.body.position.set(game.system.width * .5, game.system.height * .7);

        this.hitScore = 0
        this.missScore = 0
        this.hitRatio = this.hitScore/this.missScore
        this.pointScore = this.hitScore * this.hitRatio

        this.deathCounter = 0
    },


    punchLeft: function() {
      this.body.velocity.x = this.body.velocity.x - 50;
      this.sprite.textures = this.punchLeftAnim;
      this.body.shape.width = this.sprite.width + 30;
    },

    kickLeft: function() {
      this.sprite.textures = this.kickLeftAnim;
      this.body.velocity.x = this.body.velocity.x - 50;
      this.body.shape.width = this.sprite.width + 30;
    },

    punchRight: function() {
      this.sprite.textures = this.punchRightAnim;
      this.body.velocity.x = this.body.velocity.x + 50;
      this.body.shape.width = this.sprite.width + 30;
    },

    kickRight: function() {
      this.sprite.textures = this.kickRightAnim;
      this.body.velocity.x = this.body.velocity.x + 50;
      this.body.shape.width = this.sprite.width + 30;
    },

    collide: function(other) {
      if (other.collisionGroup === 0){
          this.body.velocity.y = 0;
          this.body.mass = 0;
      }
      else if (other.collisionGroup === 2){
        if (attacking === false){
          this.sprite.textures = this.collideLeftAnim;
          this.body.velocity.x = 2000;
          this.deathCounter++
          // console.log(this.deathCounter)
        }
        else if (attacking === true){
          other.parent.kill();
          var that = this
          // setTimeout(function(){
            that.hitScore = that.hitScore + .5;
          // }, 1)
        }
      }
      else if (other.collisionGroup === 3){
        if (attacking === false){
          this.sprite.textures = this.collideRightAnim;
          this.body.velocity.x = -2000;
          this.deathCounter++
          // console.log(this.deathCounter)
        }
        else if (attacking === true){
          other.parent.kill();
          var that = this
          // setTimeout(function(){
            that.hitScore = that.hitScore + .5;
          // }, 1)
        }
      }
    },

    scoreCounter: function(){
      this.hitScore = this.hitScore + .5
      console.log(this.hitScore)
    },

    kill: function() {
      this.sprite.textures = this.deathAnim;

      var that = this
      setTimeout(function(){
        that.body.remove()
        that.sprite.remove();
      }, 1000)
    },

    update: function() {
        var that = this;
        if (this.sprite.textures !== this.idleAnim){
          setTimeout(function(){
            that.sprite.textures = that.idleAnim;
            that.body.velocity.x = 0
            that.body.shape.width = 78
          }, 150)
        }
        this.sprite.position.x = this.body.position.x;
        this.sprite.position.y = this.body.position.y;

        if (this.deathCounter >= 5){
          this.kill();
        }
    }

  });

  game.createClass('EnemyLeft', {
      onGround: false,
      init: function(x, y) {
        this.sprite = game.Animation.fromFrames('running_guy_left');
        this.sprite.scale.set(2.5, 2.5);
        this.sprite.animationSpeed = 0.08;
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.play();

        // this.runningAnim = this.sprite.textures;

        this.body = new game.Body({
          // position: {
          //       x:x,
          //       y:y
          //   },
          mass: 1000,
          collisionGroup: 2,
          collideAgainst: [0, 1],
        });

        this.body.parent = this;
        game.scene.world.addBody(this.body);
        game.scene.addObject(this);
        var shape = new game.Rectangle(this.sprite.width, 100);
        this.body.addShape(shape);
        this.body.mass = 1;
        this.body.collide = this.collide.bind(this);
        this.body.position.set(0, game.system.height * .7);
        this.body.velocity.x = 400;
        this.body.shape.width = this.sprite.width
      },

      attack: function() {
      },

      collide: function(other) {
        if (other.collisionGroup === 0){
          this.body.velocity.y = 0;
          this.body.mass = 0;
          this.onGround = true;
        }
        else if (other.collisionGroup === 1){

        }
      },

      kill: function() {
        this.body.velocity.x = -3000
        this.body.velocity.y = -400
        // this.body.mass = 1
        this.onGround = false
        var that = this;
        setTimeout(function(){
          that.body.remove()
          that.sprite.remove()
        }, 300)
      },

      win: function() {
      },

      update: function() {
        this.sprite.position.x = this.body.position.x;
        this.sprite.position.y = this.body.position.y;
      }

  });

  game.createClass('EnemyRight', {
      onGround: false,
      init: function(x, y) {
        this.sprite = game.Animation.fromFrames('running_guy_right');
        this.sprite.scale.set(2.5, 2.5);
        this.sprite.animationSpeed = 0.08;
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.play();

        // this.runningAnim = this.sprite.textures;

        this.body = new game.Body({
          // position: {
          //       x:x,
          //       y:y
          //   },
          // force: (1, 5),
          mass: 1,
          collisionGroup: 3,
          collideAgainst: [0, 1],
        });

        this.body.parent = this;
        game.scene.world.addBody(this.body);
        game.scene.addObject(this);
        var shape = new game.Rectangle(this.sprite.width, 100);
        this.body.addShape(shape);
        this.body.mass = 1;
        this.body.collide = this.collide.bind(this);
        this.body.position.set(game.system.width, game.system.height * .7);
        this.body.velocity.x = -400;
        this.body.shape.width = this.sprite.width
      },

      attack: function() {
      },

      collide: function(other) {
        if (other.collisionGroup === 0){
          this.body.velocity.y = 0;
          this.body.mass = 0;
          this.onGround = true;
        }

      },

      kill: function() {
        this.body.velocity.x = 3000
        this.body.velocity.y = 400
        this.body.mass = 1
        this.onGround = false
        var that = this;
        setTimeout(function(){
          that.body.remove()
          that.sprite.remove()
        }, 300)
      },

      win: function() {
      },

      update: function() {
        this.sprite.position.x = this.body.position.x;
        this.sprite.position.y = this.body.position.y;
      }

  });


});
