var game = new Phaser.Game(800,600, Phaser.AUTO, 'gameDiv')

game.state.add("menu", menuState)
game.state.add("play", playState)
// game.state.add("win", winState)

game.state.start("menu")