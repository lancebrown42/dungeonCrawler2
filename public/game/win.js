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
		// game.destroy()
		// var game = new Phaser.Game(800,600, Phaser.AUTO, 'gameDiv')
		// game.state.add("menu", menuState)
		// game.state.add("play", playState)
		// game.state.add("win", winState)

		// game.state.start("menu")
		var canvas = document.getElementsByTagName('canvas')
		canvas.innerHtml+="id = 'game'"
		// canvas.parentElement.removeChild("canvas")
		$("canvas").remove()
		start()
	}
}