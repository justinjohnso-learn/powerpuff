game.module(
  'game.objects'
)

.body(function() {

  game.createClass('Player', {
    // Borrowed onGround method from https://github.com/ekelokorpi/panda.js-engine-games/tree/master/endlessrunner
    onGround: false,

    init: function(x, y) {
        // Initializing animations
        this.sprite = game.Animation.fromFrames('buttercup_idle');
        this.sprite.scale.set(2.75, 2.75)
        this.sprite.animationSpeed = 0.08;
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.play();

        this.idleAnim = this.sprite.textures;
        this.punchLeftAnim = [game.Texture.fromFrame('buttercup_punch_left_heavy.png')];
        this.kickLeftAnim = [game.Texture.fromFrame('buttercup_kick_left_2.png')];
        this.punchRightAnim = [game.Texture.fromFrame('buttercup_punch_right_heavy.png')];
        this.kickRightAnim = [game.Texture.fromFrame('buttercup_kick_right_2.png')];
        this.collideLeftAnim = [game.Texture.fromFrame('buttercup_hit_left.png')];
        this.collideRightAnim = [game.Texture.fromFrame('buttercup_hit_right.png')];

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
        var shape = new game.Rectangle(this.sprite.width -10, 100);
        this.body.addShape(shape);
        // this.body.velocity.x = -this.body.velocityLimit.y;
        this.body.mass = 1;
        this.body.collide = this.collide.bind(this);
        this.body.position.set(game.system.width * .5, game.system.height * .7);

        this.hitScore = 0
        this.missScore = 0
        this.hitRatio = this.hitScore/this.missScore
        this.pointScore = this.hitScore * this.hitRatio
    },


    punchLeft: function() {
      this.body.velocity.x = this.body.velocity.x - 50;
      this.sprite.textures = this.punchLeftAnim;
      this.body.shape.width = 120;
    },

    kickLeft: function() {
      this.sprite.textures = this.kickLeftAnim;
      this.body.velocity.x = this.body.velocity.x - 50;
      this.body.shape.width = 150;
    },

    punchRight: function() {
      this.sprite.textures = this.punchRightAnim;
      this.body.velocity.x = this.body.velocity.x + 50;
      this.body.shape.width = 120;
    },

    kickRight: function() {
      this.sprite.textures = this.kickRightAnim;
      this.body.velocity.x = this.body.velocity.x + 50;
      this.body.shape.width = 150;
    },

    collide: function(other) {
      if (other.collisionGroup === 0){
          this.body.velocity.y = 0;
          this.body.mass = 0;
      }
      else if (other.collisionGroup === 2){
        if (attacking === false){
          this.sprite.textures = this.collideLeftAnim;
          this.body.velocity.x = 1000;
        }
        else if (attacking === true){
          other.parent.kill();
          var that = this
          setTimeout(function(){
            that.scoreCounter();
          }, 200)
        }
      }
      else if (other.collisionGroup === 3){
        if (attacking === false){
          this.sprite.textures = this.collideRightAnim;
          this.body.velocity.x = -1000;
        }
        else if (attacking === true){
          other.parent.kill();
          var that = this
          setTimeout(function(){
            that.scoreCounter();
          }, 200)
        }
      }
    },

    scoreCounter: function(){
      this.hitScore ++
      debugger
      console.log(this.hitScore)
    },

    kill: function() {
    },

    update: function() {
        var that = this;
        if (this.sprite.textures !== this.idleAnim){
          setTimeout(function(){
            that.sprite.textures = that.idleAnim;
            that.body.velocity.x = 0
            that.body.shape.width = 78
          }, 100)
        }
        this.sprite.position.x = this.body.position.x;
        this.sprite.position.y = this.body.position.y;
    },



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
        this.body.velocity.x = -1000
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
        this.body.velocity.x = 1000
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
