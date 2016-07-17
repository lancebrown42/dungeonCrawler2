var game = new Phaser.Game(800,600, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render})


function preload(){
	game.load.tilemap('overworld','assets/maps/testmap.json',null, Phaser.Tilemap.TILED_JSON)
	game.load.spritesheet('man','assets/walkcycle/BODY_male.png',64,64)
	// game.load.spritesheet('man','assets/BODY_male_left.png',64,64,9)
	game.load.image('tiles','assets/maps/DungeonCrawl_ProjectUtumnoTileset.png')

}
var map,
	man,
	walls,
	cursors,
	layer,
	terrain,
	keyUp,
	keyDown,
	keyLeft,
	keyRight,
	keyAttack,
	keyAct
	

function create(){
	//*****************************************************************
	//start Arcade
	//*****************************************************************

	game.physics.startSystem(Phaser.Physics.ARCADE);

	//*****************************************************************
	//load in the map
	//*****************************************************************

	game.stage.backgroundColor = "#4488AA"
	map = this.game.add.tilemap("overworld")
	map.addTilesetImage("Dungeon","tiles")
	layer = map.createLayer('Ground');
	terrain = map.createLayer('Collision');
	layer.resizeWorld();
	// console.log(this.terrain)
    // this.game.terrain = map.createLayer('Terrain');
    // this.game.obj = map.createLayer('Object Layer 1')
    // map.setCollisionBetween(900,1200);
    // this.physics.p2.convertTilemap(map, this.terrain);
    // console.log(this.physics.p2.convertTilemap(map, this.terrain))
    
    // this.terrain.debug = true

    //*****************************************************************
    //Load in player model
    //*****************************************************************

	man = game.add.sprite(50,50, 'man');
	// this.physics.p2.enable(man)
    // man.anchor.setTo(0.5, 0.5);
    man.scale.setTo(0.5,0.5);

	// layer = map.createLayer("Ground")
	// terrain = map.createLayer("Terrain")
	// man = game.add.sprite(game.world.centerX, game.world.centerY, 'man');
    

    // this.physics.p2.setImpactEvents(true);
	// var playerCollisionGroup = this.physics.p2.createCollisionGroup();
	// var terrainCollisionGroup = this.physics.p2.createCollisionGroup();
    // this.physics.p2.updateBoundsCollisionGroup();
    game.physics.arcade.enable(man)
    

    //*****************************************************************
    //camera setup
    //*****************************************************************

    game.camera.setBoundsToWorld()
    game.camera.setSize(800,600)
    game.camera.follow(man)
    // walls = game.add.group()
    // man.enableBody = true
    // walls.enableBody = true
    // walls.physicsBodyType = Phaser.Physics.P2JS;
    // this.physics.enable([man,this.terrain],Phaser.Physics.ARCADE)
    map.setCollisionBetween(1, 4000, true, terrain)
    // this.physics.p2.setBoundsToWorld(true, true, true, true, false);
    man.body.collideWorldBounds = true
    // man.body.setZeroDamping();
	// man.body.fixedRotation = true;
	//*****************************************************************
	//animate the player
	//*****************************************************************
    manimation = man.animations
    manimation.add('walkLeft',[10,11,12,13,14,15,16,17],20,true)
    manimation.add('walkRight',[28,29,30,31,32,33,34,35],20,true)
    manimation.add('walkUp',[1,2,3,4,5,6,7,8],20,true)
    manimation.add('walkDown',[19,20,21,22,23,24,25,26],20,true)
    keyUp     = game.input.keyboard.addKey(Phaser.Keyboard.W)
    keyDown   = game.input.keyboard.addKey(Phaser.Keyboard.S)
    keyLeft   = game.input.keyboard.addKey(Phaser.Keyboard.A)
    keyRight  = game.input.keyboard.addKey(Phaser.Keyboard.D)
    keyAttack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    keyAct 	  = game.input.keyboard.addKey(Phaser.Keyboard.E)
    cursors   = game.input.keyboard.createCursorKeys();
    
}
function update(){
	// man.body.setZeroVelocity();
	game.input.keyboard.addCallbacks(Phaser.Keyboard.UP,null,function(){manimation.stop(true)},null)
	//  if (cursors.left.isDown)
 //    {
 //    	man.body.moveLeft(400);
 //    	manimation.play('walkLeft',10,false)
 //    }
 //    else if (cursors.right.isDown)
 //    {
 //    	man.body.moveRight(400);
 //    	manimation.play('walkRight',10,false)
 //    }

 //    if (cursors.up.isDown)
 //    {
 //    	man.body.moveUp(400);
 //    	manimation.play('walkUp',10,false)
 //    }
 //    else if (cursors.down.isDown)
 //    {
 //    	man.body.moveDown(400);
 //    	manimation.play('walkDown',10,false)
 //    }
 game.physics.arcade.collide(man, terrain);

    man.body.velocity.x = 0;
    man.body.velocity.y = 0;
    if (keyLeft.isDown) {
        man.body.velocity.x = -225
        man.animations.play('walkLeft',10,false)
    }
    else if (keyRight.isDown) {
        man.body.velocity.x = 225
        man.animations.play('walkRight',10,false)
    }
    else if (keyDown.isDown){
        man.body.velocity.y = 225
        man.animations.play('walkDown',10,false)
    }
    else if (keyUp.isDown){
        man.body.velocity.y = -225
        man.animations.play('walkUp',10,false)
        
    }
    if (keyAct.isDown){
    	console.log("EEEEEEEEE")
    }
    else if(keyAttack.isDown){
    	console.log("killlll")
    }

    // if (cursors.left.isDown)
    // {
    //     man.body.velocity.x = -150;

    //     if (facing != 'walkleft')
    //     {
    //         man.animations.play('left');
    //         facing = 'left';
    //     }
    // }
    // else if (cursors.right.isDown)
    // {
    //     man.body.velocity.x = 150;

    //     if (facing != 'right')
    //     {
    //         man.animations.play('right');
    //         facing = 'right';
    //     }
    // }
    // else
    // {
    //     if (facing != 'idle')
    //     {
    //         man.animations.stop();

    //         if (facing == 'left')
    //         {
    //             man.frame = 0;
    //         }
    //         else
    //         {
    //             man.frame = 5;
    //         }

    //         facing = 'idle';
    //     }
    // }
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