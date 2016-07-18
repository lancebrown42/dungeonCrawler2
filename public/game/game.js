var game = new Phaser.Game(800,600, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render})


function preload(){
	game.load.tilemap('overworld','assets/maps/testmap.json',null, Phaser.Tilemap.TILED_JSON)
	game.load.spritesheet('man','assets/walkcycle/BODY_male.png',64,64)
	game.load.spritesheet('plateShoes', 'assets/walkcycle/FEET_plate_armor_shoes.png',64,64)
	game.load.spritesheet('plateHelm', 'assets/walkcycle/HEAD_plate_armor_helmet.png',64,64)
	game.load.spritesheet('platePants', 'assets/walkcycle/LEGS_plate_armor_pants.png',64,64)
	game.load.spritesheet('plateChest', 'assets/walkcycle/TORSO_plate_armor_torso.png',64,64)
	game.load.spritesheet('leatherShoes', 'assets/walkcycle/FEET_shoes_brown.png',64,64)
	game.load.spritesheet('leatherHelm', 'assets/walkcycle/HEAD_leather_armor_hat.png',64,64)
	game.load.spritesheet('leatherPants', 'assets/walkcycle/LEGS_pants_greenish.png',64,64)
	game.load.spritesheet('leatherChest', 'assets/walkcycle/TORSO_leather_armor_torso.png',64,64)
	// game.load.spritesheet('man','assets/BODY_male_left.png',64,64,9)
	game.load.image('tiles','assets/maps/DungeonCrawl_ProjectUtumnoTileset.png')
	game.load.image('axe','assets/item_sprites/axe.png')
	game.load.image('closedDoor','assets/item_sprites/closedDoor.png')
	game.load.image('bow','assets/item_sprites/bow.png')
	game.load.image('sword','assets/item_sprites/sword.png')
	game.load.image('steelChest','assets/item_sprites/steelChest.png')
	game.load.spritesheet('sprites','assets/maps/DungeonCrawl_ProjectUtumnoTileset.png')

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
	armor = game.add.group()
    weapons = game.add.group();
    doors = game.add.group();
    weapons.enableBody = true;
    doors.enableBody = true;
    armor.enableBody = true;
	map.createFromObjects('Items', 1858, 'axe', 0, true, false, weapons)
	map.createFromObjects('Items', 728, 'closedDoor', 0, true, false, doors)
	map.createFromObjects('Items', 1877, 'bow', 0, true, false, weapons)
	map.createFromObjects('Items', 1797, 'sword', 0, true, false, weapons)
	map.createFromObjects('Items', 1353, 'steelChest', 0, true, false, armor)
    // this.terrain.debug = true

    //*****************************************************************
    //Load in player model
    //*****************************************************************

	man = game.add.sprite(50,50, 'man');
	helm = game.add.sprite(50,50,'leatherHelm')
	shoes = game.add.sprite(50,50,'leatherShoes')
	chest = game.add.sprite(50,50,'leatherChest')
	pants = game.add.sprite(50,50,'leatherPants')
	// this.physics.p2.enable(man)
    // man.anchor.setTo(0.5, 0.5);
    man.scale.setTo(0.5,0.5);
    helm.scale.setTo(0.5,0.5)
    shoes.scale.setTo(0.5,0.5)
    chest.scale.setTo(0.5,0.5)
    pants.scale.setTo(0.5,0.5)

	// layer = map.createLayer("Ground")
	// terrain = map.createLayer("Terrain")
	// man = game.add.sprite(game.world.centerX, game.world.centerY, 'man');
    

    // this.physics.p2.setImpactEvents(true);
	// var playerCollisionGroup = this.physics.p2.createCollisionGroup();
	// var terrainCollisionGroup = this.physics.p2.createCollisionGroup();
    // this.physics.p2.updateBoundsCollisionGroup();
    game.physics.arcade.enable(man)
    game.physics.arcade.enable(helm)
    game.physics.arcade.enable(shoes)
    game.physics.arcade.enable(chest)
    game.physics.arcade.enable(pants)
    

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
    helm.body.collideWorldBounds = true
    shoes.body.collideWorldBounds = true
    chest.body.collideWorldBounds = true
    pants.body.collideWorldBounds = true
    // man.body.setZeroDamping();
	// man.body.fixedRotation = true;
	//*****************************************************************
	//animate the player
	//*****************************************************************
    manimation = man.animations
    helmAni = helm.animations
    shoesAni = shoes.animations
    pantsAni = pants.animations
    chestAni = chest.animations
    //*************************************************************
    manimation.add('walkLeft',[10,11,12,13,14,15,16,17],20,true)
    manimation.add('walkRight',[28,29,30,31,32,33,34,35],20,true)
    manimation.add('walkUp',[1,2,3,4,5,6,7,8],20,true)
    manimation.add('walkDown',[19,20,21,22,23,24,25,26],20,true)
    //*************************************************************
    helmAni.add('walkLeft',[10,11,12,13,14,15,16,17],20,true)
    helmAni.add('walkRight',[28,29,30,31,32,33,34,35],20,true)
    helmAni.add('walkUp',[1,2,3,4,5,6,7,8],20,true)
    helmAni.add('walkDown',[19,20,21,22,23,24,25,26],20,true)
    //*************************************************************
    shoesAni.add('walkLeft',[10,11,12,13,14,15,16,17],20,true)
    shoesAni.add('walkRight',[28,29,30,31,32,33,34,35],20,true)
    shoesAni.add('walkUp',[1,2,3,4,5,6,7,8],20,true)
    shoesAni.add('walkDown',[19,20,21,22,23,24,25,26],20,true)
    //*************************************************************
    chestAni.add('walkLeft',[10,11,12,13,14,15,16,17],20,true)
    chestAni.add('walkRight',[28,29,30,31,32,33,34,35],20,true)
    chestAni.add('walkUp',[1,2,3,4,5,6,7,8],20,true)
    chestAni.add('walkDown',[19,20,21,22,23,24,25,26],20,true)
    //*************************************************************
    pantsAni.add('walkLeft',[10,11,12,13,14,15,16,17],20,true)
    pantsAni.add('walkRight',[28,29,30,31,32,33,34,35],20,true)
    pantsAni.add('walkUp',[1,2,3,4,5,6,7,8],20,true)
    pantsAni.add('walkDown',[19,20,21,22,23,24,25,26],20,true)
    //*************************************************************
    keyUp     = game.input.keyboard.addKey(Phaser.Keyboard.W)
    keyDown   = game.input.keyboard.addKey(Phaser.Keyboard.S)
    keyLeft   = game.input.keyboard.addKey(Phaser.Keyboard.A)
    keyRight  = game.input.keyboard.addKey(Phaser.Keyboard.D)
    keyAttack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    keyAct 	  = game.input.keyboard.addKey(Phaser.Keyboard.E)
    cursors   = game.input.keyboard.createCursorKeys();
    man.inventory = ['Leather Armor']
    man.health = 100
    man.strength = 10
    man.alive = true
    
}
function update(){
	// man.body.setZeroVelocity();
	game.input.keyboard.addCallbacks(Phaser.Keyboard.UP,null,function(){manimation.stop(true); helmAni.stop(true);pantsAni.stop(true);shoesAni.stop(true);chestAni.stop(true);},null)

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
 game.physics.arcade.collide(helm, terrain);
 game.physics.arcade.collide(pants, terrain);
 game.physics.arcade.collide(chest, terrain);
 game.physics.arcade.collide(shoes, terrain);
 	if(weapons.children[0]){
 		for(weapon in weapons.children){
		 	if(man.overlap(weapons.children[weapon])){
		 		overlapCallback(man,weapons.children[weapon])
		 	}
		}
	}
    man.body.velocity.x = 0;
    man.body.velocity.y = 0;
    helm.body.velocity.x = 0;
    helm.body.velocity.y = 0;
	pants.body.velocity.x = 0;
	pants.body.velocity.y = 0;
	shoes.body.velocity.x = 0;
	shoes.body.velocity.y = 0;
	chest.body.velocity.x = 0;
	chest.body.velocity.y = 0;

    if (keyLeft.isDown) {
        man.body.velocity.x = -225
        man.animations.play('walkLeft',10,false)
        helm.body.velocity.x = -225
        helm.animations.play('walkLeft',10,false)
        shoes.body.velocity.x = -225
        shoes.animations.play('walkLeft',10,false)
        pants.body.velocity.x = -225
        pants.animations.play('walkLeft',10,false)
        chest.body.velocity.x = -225
        chest.animations.play('walkLeft',10,false)

    }
    else if (keyRight.isDown) {
        man.body.velocity.x = 225
        man.animations.play('walkRight',10,false)
        helm.body.velocity.x = 225
        helm.animations.play('walkRight',10,false)
        shoes.body.velocity.x = 225
        shoes.animations.play('walkRight',10,false)
        pants.body.velocity.x = 225
        pants.animations.play('walkRight',10,false)
        chest.body.velocity.x = 225
        chest.animations.play('walkRight',10,false)
    }
    else if (keyDown.isDown){
        man.body.velocity.y = 225
        man.animations.play('walkDown',10,false)
        helm.body.velocity.y = 225
        helm.animations.play('walkDown',10,false)
        shoes.body.velocity.y = 225
        shoes.animations.play('walkDown',10,false)
        pants.body.velocity.y = 225
        pants.animations.play('walkDown',10,false)
        chest.body.velocity.y = 225
        chest.animations.play('walkDown',10,false)
    }
    else if (keyUp.isDown){
        man.body.velocity.y = -225
        man.animations.play('walkUp',10,false)
        helm.body.velocity.y = -225
        helm.animations.play('walkUp',10,false)
        shoes.body.velocity.y = -225
        shoes.animations.play('walkUp',10,false)
        pants.body.velocity.y = -225
        pants.animations.play('walkUp',10,false)
        chest.body.velocity.y = -225
        chest.animations.play('walkUp',10,false)
        
    }
    if(keyAct.isDown){ //using the action key

	    if (man.body.blocked.right) {
	    // running into a wall on the right

		} else if (man.body.blocked.left) {
		    // running into a wall on the left

		} else if (man.body.blocked.up) {
		    // hitting something above

		} else if (man.body.blocked.down) {

			console.log(man)

		    // on the ground. same as man.body.onFloor() ??

		}
    }

    else if(keyAttack.isDown){

    	console.log(man.health)
    }
    if(man.health <= 0){
    	man.alive = false
    	death(man)
    }

   
}
function overlapCallback(player, item){
	player.inventory.push(item.key)
	item.destroy()
}

function render() {
	game.debug.bodyInfo(man,20,150)
    game.debug.spriteInfo(man, 20, 32);
    game.debug.cameraInfo(game.camera, 32, 500)

}
function collisionHandler(obj1,obj2){
	console.log('Collision between ',obj1,' and ',obj2)
}