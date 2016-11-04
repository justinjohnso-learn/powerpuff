game.module(
  'game.objects'
)

.body(function() {

  game.createClass('Player', {

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
        this.gotHitAnim = [game.Texture.fromFrame('buttercup_hit_left.png')];

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
            // 2 = enemy
          collideAgainst: [0, 2],
        });

        // var shape = new game.Rectangle(80, 190);
        // this.body.addShape(shape);
        game.scene.world.addBody(this.body);
        game.scene.addObject(this);
        var shape = new game.Rectangle(this.sprite.width -10, 100);
        this.body.addShape(shape);
        // this.body.velocity.x = -this.body.velocityLimit.y;
        this.body.mass = 1;
        // debugger
        this.body.collide = this.gotHit.bind(this);
        this.body.position.set(game.system.width * .5, game.system.height * .7);

    },

    punchLeft: function() {
      this.body.velocity.x = this.body.velocity.x - 500;
      this.sprite.textures = this.punchLeftAnim;

    },

    kickLeft: function() {
      this.sprite.textures = this.kickLeftAnim;
      this.body.velocity.x = this.body.velocity.x - 500;
    },

    punchRight: function() {
      this.sprite.textures = this.punchRightAnim;
      this.body.velocity.x = this.body.velocity.x + 500;
    },

    kickRight: function() {
      this.sprite.textures = this.kickRightAnim;
      this.body.velocity.x = this.body.velocity.x + 500;
    },

    gotHit: function(other) {
      if (other.collisionGroup === 0){
          this.body.velocity.y = 0;
          this.body.mass = 0;
      }
      if (other.collisionGroup === 2){
        if (this.sprite.textures != this.idleAnim){
          this.sprite.textures = this.gotHitAnim;
          this.body.velocity.x = 1000;
        }
        else if (this.sprite.textures = this.idleAnim){
          this.body.velocity.y = -500;
        }
      }
    },

    kill: function() {
    },

    update: function() {
        var that = this;
        if (this.sprite.textures !== this.idleAnim){
          setTimeout(function(){
            that.sprite.textures = that.idleAnim;
            that.body.velocity.x = 0
          }, 1000)
        }
        this.sprite.position.x = this.body.position.x;
        this.sprite.position.y = this.body.position.y;
    }


  });

  game.createClass('EnemyLeft', {
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
          mass: 1,
          collisionGroup: 2,
          collideAgainst: [0, 1],

        });

        game.scene.world.addBody(this.body);
        game.scene.addObject(this);
        var shape = new game.Rectangle(this.sprite.width, 100);
        this.body.addShape(shape);
        this.body.mass = 1;
        this.body.collide = this.gotHit.bind(this);
        this.body.position.set(0, game.system.height * .7);
        this.body.velocity.x = 400;
      },

      attack: function() {
      },

      gotHit: function(other) {
        if (other.collisionGroup === 0){
          this.body.velocity.y = 0;
          this.body.mass = 0;
        }

      },

      kill: function() {
      },

      win: function() {
      },

      update: function() {
        this.sprite.position.x = this.body.position.x;
        this.sprite.position.y = this.body.position.y;
      }

  });


});
