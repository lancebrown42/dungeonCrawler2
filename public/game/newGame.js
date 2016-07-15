var game = new Phaser.Game(800,600, Phaser.AUTO, 'game');

var PhaserGame = function(game){
	this.map = null
	this.layer = null
	this.man = null
	this.manimation = null
}
PhaserGame.prototype = {
	 init: function () {

            this.physics.startSystem(Phaser.Physics.ARCADE);

        },

        preload: function () {
        	this.load.tilemap('map', 'assets/maps/newMap.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('tiles', 'assets/maps/newMap.bmp');
            this.load.spritesheet('man', 'assets/walkcycle/BODY_male.png',64,64);
		},
		create: function () {

            this.map = this.add.tilemap('map');
            this.map.addTilesetImage('spritesheet', 'tiles');

            this.layer = this.map.createLayer('Ground');
            this.layer = this.map.createLayer('Terrain');

            // this.map.setCollision(20, true, this.layer);

            this.man = this.add.sprite(10, 10, 'man');
            this.man.anchor.set(0.5,0.5);

            this.physics.arcade.enable(this.man);

            this.manimation = this.man.animations
		    this.manimation.add('walkLeft',[10,11,12,13,14,15,16,17],20,true)
		    this.manimation.add('walkRight',[28,29,30,31,32,33,34,35],20,true)
		    this.manimation.add('walkUp',[1,2,3,4,5,6,7,8],20,true)
		    this.manimation.add('walkDown',[19,20,21,22,23,24,25,26],20,true)

        },
        update: function(){
        	this.game.input.keyboard.addCallbacks(Phaser.Keyboard.UP,null,function(){PhaserGame.manimation.stop(true)},null)

			if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
		    {
		        this.man.x -= 4;
		        this.manimation.play('walkLeft', 10, false);
		    }
		    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
		    {
		        this.man.x += 4;
		        this.manimation.play('walkRight',10,false)
		    }

		    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
		    {
		        this.man.y -= 4;
		        this.manimation.play('walkUp',10,false)
		    }
		    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
		    {
		        this.man.y += 4;
		        this.manimation.play('walkDown',10,false)
		    }
        }

}
game.state.add('Game', PhaserGame, true);