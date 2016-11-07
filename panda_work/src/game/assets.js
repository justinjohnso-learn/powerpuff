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

  // Buttons
    // http://i237.photobucket.com/albums/ff148/lethargica/play_button.png
    game.addAsset('play_button.png')
    // http://www-tc.pbskids.org/wildkratts/games/animal-match/Images/Icons/Play%20Again%20Button_Pressed.png
    game.addAsset('play_again_button.png')

  // Sprites
    // http://spritedatabase.net/game/1763
    game.addAsset('sprites/blossom.json')
    game.addAsset('sprites/bubbles.json')
    game.addAsset('sprites/buttercup.json')
    game.addAsset('sprites/largemouth.json')
    // https://www.spriters-resource.com/fullview/16610/
    game.addAsset('running_guy.json')


  // Fonts
    game.addAsset('powerpuff_font/powerpuff.fnt')

  // Audio
    game.addAudio('audio/ppg_theme.ogg', 'ppg_theme');
    game.addAudio('audio/ppg_fight_loop_intro.ogg', 'ppg_fight_intro')
    game.addAudio('audio/ppg_fight_loop.ogg', 'ppg_fight')

    // game.addAudio('audio/sfx/hit_sound.ogg', 'hit_sound')
    // game.addAudio('audio/sfx/attack_sound_1.ogg', 'attack_sound_1')
    // game.addAudio('audio/sfx/attack_sound_2.ogg', 'attack_sound_2')
    // game.addAudio('audio/sfx/attack_sound_3.ogg', 'attack_sound_3')
    // game.addAudio('audio/sfx/attack_sound_4.ogg', 'attack_sound_4')
    // game.addAudio('audio/sfx/attack_sound_5.ogg', 'attack_sound_5')
});
