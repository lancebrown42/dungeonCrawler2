var menuState = {
	create: function(){
		
		var nameLabel = game.add.text(80,80, "Mr. Bones' Wild Dungeon",{font: '50px Arial', fill:'#ffffff'})
		var startLabel = game.add.text(80,game.world.height-120,"Press Space to Start",{font: '25px Arial', fill:'#ffffff'})
		var startLabel = game.add.text(80,game.world.height-80,"WASD to move, E to interact, Space to attack",{font: '25px Arial', fill:'#ffffff'})

		var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

		space.onDown.addOnce(this.start, this)

	},
	start: function(){
		game.state.start("play")
	}
}