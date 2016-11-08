game.module(
  'game.assets'
)
.body(function() {
  // Images

  // Backgrounds
    // https://suwalls.com/cartoons/blossom-bubbles-and-buttercup-the-powerpuff-girls-16045/
    game.addAsset('images/backgrounds/the_girls.jpg')
    // https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/The_Powerpuff_Girls_logo.svg/2000px-The_Powerpuff_Girls_logo.svg.png
    game.addAsset('images/backgrounds/logo.png')
    // http://www.conceptart.org/forums/showthread.php/230307-Dystopian-City
    game.addAsset('images/backgrounds/background.jpg')
    // http://powerpuffgirls.wikia.com/wiki/File:Background.png
    game.addAsset('images/backgrounds/townsville.png')
    game.addAsset('images/backgrounds/townsville_2.png')
    // http://opengameart.org/content/wasteland-tileset
    game.addAsset('images/backgrounds/ground.png')

  // Buttons
    // http://i237.photobucket.com/albums/ff148/lethargica/play_button.png
    game.addAsset('images/play_button.png')
    // http://www-tc.pbskids.org/wildkratts/games/animal-match/Images/Icons/Play%20Again%20Button_Pressed.png
    game.addAsset('images/play_again_button.png')

  // Sprites
    // http://spritedatabase.net/game/1763
    game.addAsset('sprites/blossom.json')
    game.addAsset('sprites/bubbles.json')
    game.addAsset('sprites/buttercup.json')
    game.addAsset('sprites/largemouth.json')


  // Fonts
    game.addAsset('powerpuff_font/powerpuff.fnt')

  // Audio
    // https://www.youtube.com/watch?v=a6epMQlNWtI
    game.addAudio('audio/ppg_theme.ogg', 'ppg_theme');
    // https://www.youtube.com/watch?v=ltHN_1Bzd30
    game.addAudio('audio/ppg_fight_loop_intro.ogg', 'ppg_fight_intro')
    game.addAudio('audio/ppg_fight_loop.ogg', 'ppg_fight')

    // http://www.sounddogs.com/
      // Many of these I acquired in the past from sound designing
    game.addAudio('audio/sfx/punch.ogg', 'punch')
    game.addAudio('audio/sfx/hit_sound.ogg', 'hit_sound')
    game.addAudio('audio/sfx/attack_sound_1.ogg', 'attack_sound_1')
    game.addAudio('audio/sfx/attack_sound_2.ogg', 'attack_sound_2')
    game.addAudio('audio/sfx/attack_sound_3.ogg', 'attack_sound_3')
    game.addAudio('audio/sfx/attack_sound_4.ogg', 'attack_sound_4')
    game.addAudio('audio/sfx/attack_sound_5.ogg', 'attack_sound_5')
    game.addAudio('audio/sfx/my_leg_1.ogg', 'my_leg_1')
    game.addAudio('audio/sfx/my_leg_2.ogg', 'my_leg_2')
    game.addAudio('audio/sfx/wilhelm.ogg', 'wilhelm')
    game.addAudio('audio/sfx/silence.ogg', 'silence')
    game.addAudio('audio/sfx/sad_trombone.ogg', 'sad_trombone')
});
