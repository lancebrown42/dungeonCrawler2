var game = new Phaser.Game(800,600, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render})
// var map = new Tilemap(game)

function preload(){
	this.load.tilemap('overworld','assets/maps/testmap.json',null, Phaser.Tilemap.TILED_JSON)
	this.load.spritesheet('man','assets/walkcycle/BODY_male.png',64,64)
	// game.load.spritesheet('man','assets/BODY_male_left.png',64,64,9)
	this.load.image('tiles','assets/maps/DungeonCrawl_ProjectUtumnoTileset.png')

}
var map,
	man,
	walls,
	cursors

function create(){
	//*****************************************************************
	//start P2
	//*****************************************************************

	this.physics.startSystem(Phaser.Physics.P2JS)

	//*****************************************************************
	//load in the map
	//*****************************************************************

	this.stage.backgroundColor = "#4488AA"
	map = this.game.add.tilemap("overworld")
	map.addTilesetImage("Dungeon","tiles")
	this.layer = map.createLayer('Ground');
	this.terrain = map.createLayer('Collision');
	this.layer.resizeWorld();
	// console.log(this.terrain)
    // this.game.terrain = map.createLayer('Terrain');
    // this.game.obj = map.createLayer('Object Layer 1')
    map.setCollisionBetween(900,1200);
    this.physics.p2.convertTilemap(map, this.terrain);
    // console.log(this.physics.p2.convertTilemap(map, this.terrain))
    
    // this.terrain.debug = true

    //*****************************************************************
    //Load in player model
    //*****************************************************************

	man = this.add.sprite(50,50, 'man');
	this.physics.p2.enable(man)
    // man.anchor.setTo(0.5, 0.5);
    man.scale.setTo(0.5,0.5);

	// layer = map.createLayer("Ground")
	// terrain = map.createLayer("Terrain")
	// man = game.add.sprite(game.world.centerX, game.world.centerY, 'man');
    

    this.physics.p2.setImpactEvents(true);
	// var playerCollisionGroup = this.physics.p2.createCollisionGroup();
	// var terrainCollisionGroup = this.physics.p2.createCollisionGroup();
    // this.physics.p2.updateBoundsCollisionGroup();

    //*****************************************************************
    //camera setup
    //*****************************************************************

    this.camera.setBoundsToWorld()
    this.camera.setSize(800,600)
    this.camera.follow(man)
    walls = game.add.group()
    man.enableBody = true
    walls.enableBody = true
    walls.physicsBodyType = Phaser.Physics.P2JS;
    // this.physics.enable([man,this.terrain],Phaser.Physics.ARCADE)
    // this.physics.arcade.collide(man, this.terrain,collisionHandler)
    this.physics.p2.setBoundsToWorld(true, true, true, true, false);
    man.body.collideWorldBounds = true
    // man.body.setZeroDamping();
	man.body.fixedRotation = true;
	//*****************************************************************
	//animate the player
	//*****************************************************************
    manimation = man.animations
    manimation.add('walkLeft',[10,11,12,13,14,15,16,17],20,true)
    manimation.add('walkRight',[28,29,30,31,32,33,34,35],20,true)
    manimation.add('walkUp',[1,2,3,4,5,6,7,8],20,true)
    manimation.add('walkDown',[19,20,21,22,23,24,25,26],20,true)
    cursors = this.input.keyboard.createCursorKeys();
    
}
function update(){
	man.body.setZeroVelocity();
	game.input.keyboard.addCallbacks(Phaser.Keyboard.UP,null,function(){manimation.stop(true)},null)
	 if (cursors.left.isDown)
    {
    	man.body.moveLeft(400);
    	manimation.play('walkLeft',10,false)
    }
    else if (cursors.right.isDown)
    {
    	man.body.moveRight(400);
    	manimation.play('walkRight',10,false)
    }

    if (cursors.up.isDown)
    {
    	man.body.moveUp(400);
    	manimation.play('walkUp',10,false)
    }
    else if (cursors.down.isDown)
    {
    	man.body.moveDown(400);
    	manimation.play('walkDown',10,false)
    }
	// if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT))
 //    {
 //        man.x -= 2;
 //        manimation.play('walkLeft', 10, false);
 //    }
 //    else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
 //    {
 //        man.x += 2;
 //        manimation.play('walkRight',10,false)
 //    }

 //    if (this.input.keyboard.isDown(Phaser.Keyboard.UP))
 //    {
 //        man.y -= 2;
 //        manimation.play('walkUp',10,false)
 //    }
 //    else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN))
 //    {
 //        man.y += 2;
 //        manimation.play('walkDown',10,false)
 //    }
}
function render() {
	game.debug.bodyInfo(man,20,150)
    game.debug.spriteInfo(man, 20, 32);
    game.debug.cameraInfo(game.camera, 32, 500)

}
function collisionHandler(obj1,obj2){
	console.log('Collision between ',obj1,' and ',obj2)
}