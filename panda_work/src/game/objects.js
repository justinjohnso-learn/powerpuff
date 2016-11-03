game.module(
  'game.objects'
)

.body(function() {

  game.createClass('Player', {

      init: function(x, y) {
        this.sprite = game.Animation.fromFrames('buttercup_idle');
        this.sprite.scale.set(2.75, 2.75)
        this.sprite.position.set(game.system.width * .5, game.system.height * .65)
        this.sprite.animationSpeed = 0.08;
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.play();

        this.idleaAnim = this.sprite.textures;
        this.punchLeftAnim = [game.Texture.fromFrame('buttercup_punch_left_heavy.png')];
        this.kickLeftAnim = [game.Animation.fromFrames('buttercup_kick_left.png')];

      },

      punchLeft: function() {
        this.sprite = this.punchLeftAnim;
      },

      kickLeft: function() {
      },

      punchRight: function() {
      },

      kickRight: function() {
      },

      gotHit: function() {

      },

      kill: function() {
      },

      update: function() {
      }


  });

  game.createClass('Enemy', {
      init: function() {
      },

      attack: function() {
      },

      gotHit: function() {
      },

      kill: function() {
      },

      win: function() {
      }

  });


});
