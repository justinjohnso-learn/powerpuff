game.module(
  'game.assets'
)
.body(function() {
  // Images

  // Backgrounds
    // https://suwalls.com/cartoons/blossom-bubbles-and-buttercup-the-powerpuff-girls-16045/
    game.addAsset('backgrounds/the_girls.jpg')
    // https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/The_Powerpuff_Girls_logo.svg/2000px-The_Powerpuff_Girls_logo.svg.png
    game.addAsset('backgrounds/logo.png')
    // http://www.conceptart.org/forums/showthread.php/230307-Dystopian-City
    game.addAsset('backgrounds/background.jpg')
    // http://powerpuffgirls.wikia.com/wiki/File:Background.png
    game.addAsset('backgrounds/townsville.png')
    game.addAsset('backgrounds/townsville_2.png')
    // http://opengameart.org/content/wasteland-tileset
    game.addAsset('backgrounds/ground.png')

  // Sprites
    game.addAsset('sprites/blossom.json')
    // https://www.spriters-resource.com/fullview/16610/
    game.addAsset('running_guy.json')

  // Fonts
    game.addAsset('fridge_magnets.fnt')

  // Audio
    game.addAudio('audio/ppg_theme.ogg', 'ppg_theme');
    game.addAudio('audio/ppg_fight_loop_intro.ogg', 'ppg_fight_intro')
    game.addAudio('audio/ppg_fight_loop.ogg', 'ppg_fight')
});
