var game = new Phaser.Game(800,600, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render})
function preload(){
	game.load.tilemap()
	game.load.spritesheet('man','assets/walkcycle/BODY_male.png',64,64)
    game.load.tilemap('map', 'assets/maps/numbermap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('Dungeon', 'assets/maps/numbermap.png');

}
var map,
	layer
function create(){
	map = game.add.tilemap('map')
	map.addTilesetImage('numbersheet','Dungeon')
	// terrain = map.createLayer('Collision')
	layer = map.createLayer('Tile Layer 1')
	layer.resizeWorld();
	game.stage.backgroundColor = "#4488AA"
	man = game.add.sprite(0,0, 'man');
    man.anchor.setTo(0.5, 0.5);
    game.camera.setBoundsToWorld();
    game.camera.setSize(800,600)
    game.camera.follow(man)
    man.scale.setTo(0.5,0.5);
    manimation = man.animations
    manimation.add('walkLeft',[10,11,12,13,14,15,16,17],20,true)
    manimation.add('walkRight',[28,29,30,31,32,33,34,35],20,true)
    manimation.add('walkUp',[1,2,3,4,5,6,7,8],20,true)
    manimation.add('walkDown',[19,20,21,22,23,24,25,26],20,true)
    console.log(map)
    console.log(map.tileWidth)
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

function render(){

}