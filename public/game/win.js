var winState = {
	create: function(){
		clearInterval(spawnInterval)
		skellyArr.forEach(function(skelly){
			skelly.sprite.destroy()
		})
		game.stage.backgroundColor = "000000"
		var nameLabel = game.add.text(250,80, "YOU WIN",{font: '50px Arial', fill:'#ffffff'})
		var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

		space.onDown.addOnce(this.start, this)

	},
	start : function(){
		game.state.start("menu")
	}
}