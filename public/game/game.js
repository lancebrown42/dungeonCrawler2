var game = new Phaser.Game(800,600, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render})
// var map = new Tilemap(game)

function preload(){
	// game.load.tilemap('overworld','assets/maps/testmap.json',null, Phaser.Tilemap.TILED_JSON)
	game.load.spritesheet('man','assets/walkcycle/BODY_male.png',64,64)
	// game.load.spritesheet('man','assets/BODY_male_left.png',64,64,9)
	// game.load.image('tiles','assets/testmap.png')

}
function create(){
	game.stage.backgroundColor = "#4488AA"
	// map = game.add.tilemap("overworld")
	// map.addTilesetImage("Dungeon","tiles")
	// layer = map.createLayer("Tile Layer 1")
	// layer.resizeWorld();
	// man = game.add.sprite(game.world.centerX, game.world.centerY, 'man');
	man = game.add.sprite(0,0, 'man');
	// game.physics.startSystem(Phaser.Physics.P2JS)
	// game.physics.p2.enable(man)
    man.anchor.setTo(0.5, 0.5);
    game.camera.setBoundsToWorld()
    game.camera.setSize(800,600)
    game.camera.follow(man)
    man.scale.setTo(0.5,0.5);
    manimation = man.animations
    manimation.add('walkLeft',[10,11,12,13,14,15,16,17],20,true)
    manimation.add('walkRight',[28,29,30,31,32,33,34,35],20,true)
    manimation.add('walkUp',[1,2,3,4,5,6,7,8],20,true)
    manimation.add('walkDown',[19,20,21,22,23,24,25,26],20,true)
    
}
function update(){
	game.input.keyboard.addCallbacks(Phaser.Keyboard.UP,null,function(){manimation.stop(true)},null)

	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        man.x -= 4;
        manimation.play('walkLeft', 10, false);
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        man.x += 4;
        manimation.play('walkRight',10,false)
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        man.y -= 4;
        manimation.play('walkUp',10,false)
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
        man.y += 4;
        manimation.play('walkDown',10,false)
    }
}
function render() {
    game.debug.spriteInfo(man, 20, 32);
    game.debug.cameraInfo(game.camera, 32, 500)

}