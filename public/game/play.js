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
    keyAct,
    helm,
    shoes,
    chest,
    pants,
    healthbar,
    x,
    skelly,
    skellycounter,
    currentPlayerXtile,
    currentPlayerYtile,
    currentSkellyXTile,
    currentSkellyYTile,
    // currentNextPointX,
    // currentNextPointY,
    tileSize,
    skellyArr,
    killList,
    spawn,
    maxSkellies,
    kills,
    playerObj

var pathArr = []
var acceptableTiles = []
playerObj = {"kills": kills}
$.getJSON("../assets/maps/testmap.json", function(json) {
    // console.log(json.layers[0])
    var ph = json.layers[0].data;
    // console.log(ph)
    for(var i = 0; i<json.layers[0].height;i++){

        var ph2 = []
        for(var j = 0; j < json.layers[0].width;j++){
            ph2[j] = ph[j+i*40]
            if(ph[j+i*40]!=66&&ph[j+i*40]!=1078&&ph[j+i*40]!=1002){acceptableTiles.push(ph[j+i*40])}
        }
        pathArr[i] = ph2
        // console.log(pathArr)
    }

    // console.log(pathArr)
});
function overlapCallback(player, item, type) {
    if (type == "weapon") {
        var drop = player.inventory.weapon
        player.inventory.weapon = item
        var newSprite = game.add.sprite(player.position.x, player.position.y, drop.name)
            // weapons.add(newSprite)



    } else if (type == "armor") {
        player.inventory.armor = item.key
        changeClothes()

    } else if (type == "gold") {
        player.inventory.gold += item
    }
    item.destroy()
}

function changeClothes() {
    helm.loadTexture(man.inventory.armor + 'Helm')
    shoes.loadTexture(man.inventory.armor + 'Shoes')
    chest.loadTexture(man.inventory.armor + 'Chest')
    pants.loadTexture(man.inventory.armor + 'Pants')

}


function death(player){
    player.body.moves = false
    dead = game.add.sprite(player.position.x,player.position.y,'death')
    dead.scale.setTo(0.5,0.5)
    deadimate = dead.animations
    deadimate.add('die', [0,1,2,3,4,5], 5, true)
    deadimate.play('die',5,false)
    player.hp = player.totalhp
    man.visible = false
    var drop = player.inventory.weapon
    // console.log(drop)
    var drop2 = player.inventory.gold

    var newSprite = game.add.sprite(player.position.x, player.position.y, drop.name)
    newSprite.name = drop.name
    console.log(newSprite)
    weapons.add(newSprite)
    console.log(weapons)
    player.inventory.weapon = ""
    player.inventory.gold = ""

    setTimeout(function(){player.reset(50,50);player.body.moves = true; player.hp = player.totalhp},5000)



}
function damage(player){
    player.hp -= (Math.floor(Math.random()*6)+3)
    game.add.tween(player).to({
        tint: 0xff0000d,
    }, 100, Phaser.Easing.Exponential.Out, true, 0, 0, true);
    player.immune = true
    setTimeout(function(){
        player.immune = false
    },1000)

}
function slash(unit){
    var pos = [unit.position.x,unit.position.y]
    console.log(pos)
    var dmg
    if(unit.facing == "up"){
        manimation.play("manSlashUp",10,false)
        skellyArr.forEach(function(skelly){
            var skellPos = [skelly.sprite.position.x,skelly.sprite.position.y]
            // console.log("skelly ",skelly.number," position=",skellPos)
            if (skellPos[0] >= pos[0] - 16 && skellPos[0] <= pos[0] + 16 && skellPos[1] >= pos[1]- 32 && skellPos[1] <= pos[1]){dmg = Math.floor(Math.random()*7 +3);
                skelly.hp-=dmg
                if(skelly.hp <= 0){
                    skelly.alive = false
                    // skelly.sprite.body.velocity.x = 0
                    // skelly.sprite.body.velocity.y = 0
                    skelly.sprite.moves = false
                    skelly.sprite.animations.play('skellyDeath',5,false)
                    skelly.sprite.visible = false
                    killList.push(skellyArr.shift())
                    playerObj.kills++
                    skelly.hp = null
                    skelly.sprite.destroy()
                    $.ajax({
                      type: "POST",
                      url: "api/v0/users",
                      data: killList.length,
                      success: function(){console.log("posted")},
                      dataType: "json"
                    });


                }
                // console.log(skelly.hp)

            }
        })
    
    } else if (unit.facing == "right"){
        skellyArr.forEach(function(skelly){
            manimation.play("manSlashRight",10,false)
            var skellPos = [skelly.sprite.position.x,skelly.sprite.position.y]
            // console.log("skelly ",skelly.number," position=",skellPos)
            if (skellPos[0] >= pos[0] && skellPos[0] <= pos[0] + 32 && skellPos[1] >= pos[1]- 16 && skellPos[1] <= pos[1] +16){dmg = Math.floor(Math.random()*7 +3);
                skelly.hp-=dmg
                if(skelly.hp <= 0){
                    skelly.alive = false
                    skelly.sprite.body.velocity.x = 0
                    skelly.sprite.body.velocity.y = 0
                    skelly.sprite.moves = false
                    skelly.sprite.animations.play('skellyDeath',5,false)
                    skelly.sprite.visible = false
                    killList.push(skellyArr.shift())
                    playerObj.kills++
                    skelly.hp = null
                    $.ajax({
                      type: "POST",
                      url: "api/v0/users",
                      data: killList.length,
                      success: function(){console.log("posted")},
                      dataType: "json"
                    });


                }
                // console.log(skelly.hp)

            }
        })

    } else if (unit.facing == "down"){
        manimation.play("manSlashDown",10,false)
        skellyArr.forEach(function(skelly){
            var skellPos = [skelly.sprite.position.x,skelly.sprite.position.y]
            // console.log("skelly ",skelly.number," position=",skellPos)
            if (skellPos[0] >= pos[0] - 16 && skellPos[0] <= pos[0] + 16 && skellPos[1] <= pos[1]+ 32 && skellPos[1] >= pos[1]){dmg = Math.floor(Math.random()*7 +3);
                skelly.hp-=dmg
                if(skelly.hp <= 0){
                    skelly.alive = false
                    skelly.sprite.body.velocity.x = 0
                    skelly.sprite.body.velocity.y = 0
                    skelly.sprite.moves = false
                    skelly.sprite.animations.play('skellyDeath',5,false)
                    skelly.sprite.visible = false
                    killList.push(skellyArr.shift())
                    playerObj.kills++
                    skelly.hp = null
                    $.ajax({
                      type: "POST",
                      url: "api/v0/users",
                      data: killList.length,
                      success: function(){console.log("posted")},
                      dataType: "json"
                    });


                }
                console.log(skelly.hp)

            }
        })

    } else if (unit.facing == "left"){
        manimation.play("manSlashLeft",10,false)
        skellyArr.forEach(function(skelly){
            var skellPos = [skelly.sprite.position.x,skelly.sprite.position.y]
            // console.log("skelly ",skelly.number," position=",skellPos)
            if (skellPos[0] >= pos[0] - 16 && skellPos[0] <= pos[0] + 16 && skellPos[1] >= pos[1]- 32 && skellPos[1] <= pos[1]){dmg = Math.floor(Math.random()*7 +3);
                skelly.hp-=dmg
                if(skelly.hp <= 0){
                    skelly.alive = false
                    skelly.sprite.body.velocity.x = 0
                    skelly.sprite.body.velocity.y = 0
                    // skelly.sprite.moves = false
                    skelly.sprite.animations.play('skellyDeath',5,false)
                    skelly.sprite.visible = false
                    killList.push(skellyArr.shift())
                    playerObj.kills++
                    skelly.hp = null
                    $.ajax({
                      type: "POST",
                      url: "api/v0/users",
                      data: killList.length,
                      success: function(){console.log("posted")},
                      dataType: "json"
                    });


                }
                console.log(skelly.hp)

            }
        })

    } else {
        console.log("you done goofed"); 
        unit.hp--
    }


}
var playState = {



preload: function() {
    game.load.tilemap('overworld', '../assets/maps/testmap.json', null, Phaser.Tilemap.TILED_JSON)
    //player/enemy sprites
    game.load.spritesheet('man', '../assets/walkcycle/BODY_male.png', 64, 64)
    game.load.spritesheet('skelly','../assets/walkcycle/BODY_skeleton.png',64,64)
    game.load.spritesheet('skellyDeath','../assets/hurt/BODY_skeleton.png',64,64)
    game.load.spritesheet('death','../assets/hurt/BODY_male.png',64,64)
    //clothing animation
    game.load.spritesheet('plateShoes', '../assets/walkcycle/FEET_plate_armor_shoes.png', 64, 64)
    game.load.spritesheet('plateHelm', '../assets/walkcycle/HEAD_plate_armor_helmet.png', 64, 64)
    game.load.spritesheet('platePants', '../assets/walkcycle/LEGS_plate_armor_pants.png', 64, 64)
    game.load.spritesheet('plateChest', '../assets/walkcycle/TORSO_plate_armor_torso.png', 64, 64)
    game.load.spritesheet('leatherShoes', '../assets/walkcycle/FEET_shoes_brown.png', 64, 64)
    game.load.spritesheet('leatherHelm', '../assets/walkcycle/HEAD_leather_armor_hat.png', 64, 64)
    game.load.spritesheet('leatherPants', '../assets/walkcycle/LEGS_pants_greenish.png', 64, 64)
    game.load.spritesheet('leatherChest', '../assets/walkcycle/TORSO_leather_armor_torso.png', 64, 64)    
    //slash animation
    game.load.spritesheet('manSlash', '../assets/slash/BODY_human.png', 64, 64)
    game.load.spritesheet('plateShoesSlash', '../assets/slash/FEET_plate_armor_shoes.png', 64, 64)
    game.load.spritesheet('plateHelmSlash', '../assets/slash/HEAD_plate_armor_helmet.png', 64, 64)
    game.load.spritesheet('platePantsSlash', '../assets/slash/LEGS_plate_armor_pants.png', 64, 64)
    game.load.spritesheet('plateChestSlash', '../assets/slash/TORSO_plate_armor_torso.png', 64, 64)
    game.load.spritesheet('leatherShoesSlash', '../assets/slash/FEET_shoes_brown.png', 64, 64)
    game.load.spritesheet('leatherHelmSlash', '../assets/slash/HEAD_leather_armor_hat.png', 64, 64)
    game.load.spritesheet('leatherPantsSlash', '../assets/slash/LEGS_pants_greenish.png', 64, 64)
    game.load.spritesheet('leatherChestSlash', '../assets/slash/TORSO_leather_armor_torso.png', 64, 64)
    game.load.spritesheet('swordSlash', '../assets/slash/WEAPON_dagger.png', 64, 64)
        // game.load.spritesheet('man','../assets/BODY_male_left.png',64,64,9)
    game.load.image('tiles', '../assets/maps/DungeonCrawl_ProjectUtumnoTileset.png')
    game.load.image('axe', '../assets/item_sprites/axe.png')
    game.load.image('closedDoor', '../assets/item_sprites/closedDoor.png')
    game.load.image('bow', '../assets/item_sprites/bow.png')
    game.load.image('sword', '../assets/item_sprites/sword.png')
    game.load.image('plate', '../assets/item_sprites/steelChest.png')
    game.load.spritesheet('sprites', '../assets/maps/DungeonCrawl_ProjectUtumnoTileset.png')

},


create: function() {

    //*****************************************************************
    //start Arcade
    //*****************************************************************

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //*****************************************************************
    //load in the map
    //*****************************************************************

    game.stage.backgroundColor = "#4488AA"
    map = this.game.add.tilemap("overworld")
    map.addTilesetImage("Dungeon", "tiles")
    layer = map.createLayer('Ground');
    terrain = map.createLayer('Collision');
    layer.resizeWorld();
    //*****************************************************************
    //pathfinding
    //*****************************************************************


    var easystar = new EasyStar.js();
	easystar.setGrid(pathArr);

	// console.log(acceptableTiles)
	easystar.setAcceptableTiles(acceptableTiles);
	easystar.setIterationsPerCalculation(10000)
	tileSize = 32


	// console.log(map)
	// console.log(layer)
	// console.log(easystar.setAcceptableTiles(layer._mc.tilesets))


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
    map.createFromObjects('Items', 1353, 'plate', 0, true, false, armor)
        // this.terrain.debug = true

    //*****************************************************************
    //Load in player model
    //*****************************************************************

    man = game.add.sprite(50, 50, 'man');
    man.inventory = { "armor": "leather", "weapon": "", "gold": "0" }
    man.hp = 50
    man.totalhp = 50
    man.strength = 10
    man.alive = true
    killList = []
    man.immune = false

        //*****************************************************************
    helm = game.add.sprite(0,0, man.inventory.armor + 'Helm');
    shoes = game.add.sprite(0,0,man.inventory.armor + 'Shoes');
    chest = game.add.sprite(0,0, man.inventory.armor + 'Chest');
    pants = game.add.sprite(0,0, man.inventory.armor + 'Pants');
    man.addChild(helm)
    man.addChild(shoes)
    man.addChild(pants)
    man.addChild(chest)
    man.scale.setTo(0.5,0.5);
    man.anchor.x = 0.5
    man.anchor.y = 0.9
    helm.anchor.x = 0.5
    helm.anchor.y = 0.9
    shoes.anchor.x = 0.5
    shoes.anchor.y = 0.9
    pants.anchor.x = 0.5
    pants.anchor.y = 0.9
    chest.anchor.x = 0.5
    chest.anchor.y = 0.9

    //*******************************************************************
    // load in baddies
    //****************** *************************************************
    skellyArr = []
    var Skelly = function(number){
    	this.spawnX = Math.floor(Math.random()*1000)
    	this.spawnY = Math.floor(Math.random()*1000)
    	this.sprite = game.add.sprite(this.spawnX,this.spawnY,'skelly')
    	this.hp = 20
    	this.alive = true
    	this.gold = Math.floor(Math.random()*10)
    	this.number = number
    	this.skellyAni = this.animations
    	this.sprite.enableBody = true
    	game.physics.arcade.enable(this.sprite)
    	this.sprite.body.collideWorldBounds = true
    	game.physics.arcade.collide(this.sprite, terrain);
    	this.currentSkellyXTile = Math.floor(this.sprite.position.x/tileSize)
		this.currentSkellyYTile = Math.floor(this.sprite.position.y/tileSize)
		this.currentNextPointX
		this.currentNextPointY
		this.enemyDirection
		this.sprite.scale.setTo(0.5,0.5)
		this.sprite.anchor.x = 0.5
		this.sprite.anchor.y = 0.9
    	this.sprite.animations.add('walkLeft', [10, 11, 12, 13, 14, 15, 16, 17], 20, true)
	    this.sprite.animations.add('walkRight', [28, 29, 30, 31, 32, 33, 34, 35], 20, true)
	    this.sprite.animations.add('walkUp', [1, 2, 3, 4, 5, 6, 7, 8], 20, true)
	    this.sprite.animations.add('walkDown', [19, 20, 21, 22, 23, 24, 25, 26], 20, true)
	    this.sprite.animations.add('skellyDeath',[0,1,2,3,4,5], 5, true)

    }
    skellycounter = 0
    
    	spawnInterval = setInterval(function(){
    		skellyArr.push(new Skelly(skellycounter)); 
    		skellycounter++},5000)
    maxSkellies = 5
    // spawnInterval()
	
	
	    
    //*******************************************************************
    x = man.hp/man.totalhp
    deathbar = game.add.graphics(0,0)
	healthbar = game.add.graphics(0,0)




	deathbar.lineStyle(2,"fff",1)
	healthbar.clear()
	healthbar.lineStyle(2,"fff",1)

	deathbar.beginFill(0xFF0000)
	healthbar.beginFill(0x00FF00)
	deathbar.drawRoundedRect(man.position.x-68,man.position.y-110,32,10,5)
	healthbar.drawRoundedRect(man.position.x - 68, man.position.y - 110, 32*x, 10, 5)
	man.addChild(deathbar)
	man.addChild(healthbar)
	currentPlayerXtile = Math.floor(man.position.x / tileSize)
	currentPlayerYtile = Math.floor(man.position.y / tileSize)
	setInterval(function(){
		skellyArr.forEach(function(skelly){


			easystar.findPath(skelly.currentSkellyXTile,skelly.currentSkellyYTile,currentPlayerXtile,currentPlayerYtile, function( path ) {


		        if (path === null) {
			        console.log("The path to the destination point was not found.");
			        // return
			    }
			    if(path[1]){
			    	currentNextPointX = path[1].x;
	        	    currentNextPointY = path[1].y;
			    	
			    }

        	    if (currentNextPointX == skelly.currentSkellyXTile && currentNextPointY < skelly.currentSkellyYTile)
        	    {
        	    	// up
        	    	skelly.enemyDirection = "N";
        	    	
        	    }

        	    else if (currentNextPointX < skelly.currentSkellyXTile && currentNextPointY == skelly.currentSkellyYTile)
        	    {
        	    	// left	
        	    	skelly.enemyDirection = "W";
        	    	
        	    }
        	    else if (currentNextPointX > skelly.currentSkellyXTile && currentNextPointY == skelly.currentSkellyYTile)
        	    {
        	    	// right
        	    	skelly.enemyDirection = "E";
        	    
        	    }

        	    else if (currentNextPointX == skelly.currentSkellyXTile && currentNextPointY > skelly.currentSkellyYTile)
        	    {
        	    	// down
        	    	skelly.enemyDirection = "S";
        	    }
        	    else if(currentPlayerXtile == skelly.currentSkellyXTile && currentPlayerYtile == skelly.currentSkellyYTile && !man.immune)
        	    {
        	    	damage(man)
        	    }

        	    else
        	    {
        	    	skelly.enemyDirection = "STOP";
        	    }
			})
			easystar.calculate()
				
	})}
	)

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
    // helm.body.collideWorldBounds = true
    // shoes.body.collideWorldBounds = true
    // chest.body.collideWorldBounds = true
    // pants.body.collideWorldBounds = true
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
    manimation.add('walkLeft', [10, 11, 12, 13, 14, 15, 16, 17], 20, true)
    manimation.add('walkRight', [28, 29, 30, 31, 32, 33, 34, 35], 20, true)
    manimation.add('walkUp', [1, 2, 3, 4, 5, 6, 7, 8], 20, true)
    manimation.add('walkDown', [19, 20, 21, 22, 23, 24, 25, 26], 20, true)
    manimation.add('manSlashUp', [1, 2, 3, 4, 5, 6, 7, 8], 20, true)
    manimation.add('manSlashRight', [28, 29, 30, 31, 32, 33, 34, 35], 20, true)
    manimation.add('manSlashLeft', [10, 11, 12, 13, 14, 15, 16, 17], 20, true)
    manimation.add('manSlashDown', [19, 20, 21, 22, 23, 24, 25, 26], 20, true)
        //*************************************************************
    helmAni.add('walkLeft', [10, 11, 12, 13, 14, 15, 16, 17], 20, true)
    helmAni.add('walkRight', [28, 29, 30, 31, 32, 33, 34, 35], 20, true)
    helmAni.add('walkUp', [1, 2, 3, 4, 5, 6, 7, 8], 20, true)
    helmAni.add('walkDown', [19, 20, 21, 22, 23, 24, 25, 26], 20, true)
    helmAni.add('pantsSlashUp', [10, 11, 12, 13, 14, 15, 16, 17], 20, true)
    helmAni.add('helmSlashRight', [28, 29, 30, 31, 32, 33, 34, 35], 20, true)
    helmAni.add('helmSlashLeft', [1, 2, 3, 4, 5, 6, 7, 8], 20, true)
    helmAni.add('helmSlashDown', [19, 20, 21, 22, 23, 24, 25, 26], 20, true)
        //*************************************************************
    shoesAni.add('walkLeft', [10, 11, 12, 13, 14, 15, 16, 17], 20, true)
    shoesAni.add('walkRight', [28, 29, 30, 31, 32, 33, 34, 35], 20, true)
    shoesAni.add('walkUp', [1, 2, 3, 4, 5, 6, 7, 8], 20, true)
    shoesAni.add('walkDown', [19, 20, 21, 22, 23, 24, 25, 26], 20, true)
    shoesAni.add('pantsSlashUp', [10, 11, 12, 13, 14, 15, 16, 17], 20, true)
    shoesAni.add('shoesSlashRight', [28, 29, 30, 31, 32, 33, 34, 35], 20, true)
    shoesAni.add('shoesSlashLeft', [1, 2, 3, 4, 5, 6, 7, 8], 20, true)
    shoesAni.add('shoesSlashDown', [19, 20, 21, 22, 23, 24, 25, 26], 20, true)
        //*************************************************************
    chestAni.add('walkLeft', [10, 11, 12, 13, 14, 15, 16, 17], 20, true)
    chestAni.add('walkRight', [28, 29, 30, 31, 32, 33, 34, 35], 20, true)
    chestAni.add('walkUp', [1, 2, 3, 4, 5, 6, 7, 8], 20, true)
    chestAni.add('walkDown', [19, 20, 21, 22, 23, 24, 25, 26], 20, true)
    chestAni.add('pantsSlashUp', [10, 11, 12, 13, 14, 15, 16, 17], 20, true)
    chestAni.add('chestSlashRight', [28, 29, 30, 31, 32, 33, 34, 35], 20, true)
    chestAni.add('chestSlashLeft', [1, 2, 3, 4, 5, 6, 7, 8], 20, true)
    chestAni.add('chestSlashDown', [19, 20, 21, 22, 23, 24, 25, 26], 20, true)
        //*************************************************************
    pantsAni.add('walkLeft', [10, 11, 12, 13, 14, 15, 16, 17], 20, true)
    pantsAni.add('walkRight', [28, 29, 30, 31, 32, 33, 34, 35], 20, true)
    pantsAni.add('walkUp', [1, 2, 3, 4, 5, 6, 7, 8], 20, true)
    pantsAni.add('walkDown', [19, 20, 21, 22, 23, 24, 25, 26], 20, true)
    pantsAni.add('pantsSlashUp', [10, 11, 12, 13, 14, 15, 16, 17], 20, true)
    pantsAni.add('pantsSlashRight', [28, 29, 30, 31, 32, 33, 34, 35], 20, true)
    pantsAni.add('pantsSlashLeft', [1, 2, 3, 4, 5, 6, 7, 8], 20, true)
    pantsAni.add('pantsSlashDown', [19, 20, 21, 22, 23, 24, 25, 26], 20, true)
        //*************************************************************        //*************************************************************

        //*************************************************************


    keyUp = game.input.keyboard.addKey(Phaser.Keyboard.W)
    keyDown = game.input.keyboard.addKey(Phaser.Keyboard.S)
    keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.A)
    keyRight = game.input.keyboard.addKey(Phaser.Keyboard.D)
    keyAttack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    keyAct = game.input.keyboard.addKey(Phaser.Keyboard.E)
    cursors = game.input.keyboard.createCursorKeys();

},

update: function() {
    // man.body.setZeroVelocity();
    game.input.keyboard.addCallbacks(Phaser.Keyboard.UP, null, function() { manimation.stop(true);
        helmAni.stop(true);
        pantsAni.stop(true);
        shoesAni.stop(true);
        chestAni.stop(true); }, null)
    //*******healthbar code********************
    // healthbar = game.add.graphics(0, 0);
    // man.children.push(healthbar)
    // var hp = man.health/man.totalhp * 100;
    // healthbar.lineStyle(5,1)


    healthbar.scale.setTo(man.hp/man.totalhp,1)
    skellyArr.forEach(function(skelly){

	    game.physics.arcade.collide(skelly, terrain)
    })
 //    if (skellyArr.length > maxSkellies){
	// 	clearInterval(spawnInterval)
	// } else if(skellyArr.length < maxSkellies){
	// 	spawnInterval
	// }
    game.physics.arcade.collide(man, terrain);

    if (keyAct.isDown) {
        if (weapons.children[0]) {
            for (weapon in weapons.children) {
                if (man.overlap(weapons.children[weapon]) || weapons.children[weapon].overlap(man)) {
                    overlapCallback(man, weapons.children[weapon], "weapon")
                }
            }
        }
        if (armor.children[0]) {
            for (set in armor.children) {
                if (man.overlap(armor.children[set])) {
                    overlapCallback(man, armor.children[set], "armor")
                }
            }
        }
    }
    man.body.velocity.x = 0;
    man.body.velocity.y = 0;


    if (keyLeft.isDown) {
        man.body.velocity.x = -225
        man.facing = "left"
        man.animations.play('walkLeft', 10, false)
        // helm.body.velocity.x = -225
        helm.animations.play('walkLeft', 10, false)
        // shoes.body.velocity.x = -225
        shoes.animations.play('walkLeft', 10, false)
        // pants.body.velocity.x = -225
        pants.animations.play('walkLeft', 10, false)
        // chest.body.velocity.x = -225
        chest.animations.play('walkLeft', 10, false)

    } else if (keyRight.isDown) {
        man.body.velocity.x = 225
        man.facing = "right"
        man.animations.play('walkRight', 10, false)
        // helm.body.velocity.x = 225
        helm.animations.play('walkRight', 10, false)
        // shoes.body.velocity.x = 225
        shoes.animations.play('walkRight', 10, false)
        // pants.body.velocity.x = 225
        pants.animations.play('walkRight', 10, false)
        // chest.body.velocity.x = 225
        chest.animations.play('walkRight', 10, false)
    } else if (keyDown.isDown) {
        man.body.velocity.y = 225
        man.facing = "down"
        man.animations.play('walkDown', 10, false)
        // helm.body.velocity.y = 225
        helm.animations.play('walkDown', 10, false)
        // shoes.body.velocity.y = 225
        shoes.animations.play('walkDown', 10, false)
        // pants.body.velocity.y = 225
        pants.animations.play('walkDown', 10, false)
        // chest.body.velocity.y = 225
        chest.animations.play('walkDown', 10, false)
    } else if (keyUp.isDown) {
        man.body.velocity.y = -225
        man.facing = "up"
        man.animations.play('walkUp', 10, false)
        // helm.body.velocity.y = -225
        helm.animations.play('walkUp', 10, false)
        // shoes.body.velocity.y = -225
        shoes.animations.play('walkUp', 10, false)
        // pants.body.velocity.y = -225
        pants.animations.play('walkUp', 10, false)
        // chest.body.velocity.y = -225
        chest.animations.play('walkUp', 10, false)

    }
    var enemySpeed = 90;
				skellyArr.forEach(function(skelly){
					if(!skelly.alive){console.log('hes ded jim');return}//in case it has been killed
		       
		        if (skelly.enemyDirection == "N") {
		        	if(!skelly.alive){console.log('hes ded jim');return}
		        	skelly.sprite.body.velocity.x = 0
		        	skelly.sprite.body.velocity.y = -enemySpeed;
		        	skelly.sprite.animations.play("walkUp",10,false)
		        	

		        }
		        else if (skelly.enemyDirection == "S")
		        {
		        	if(!skelly.alive){console.log('hes ded jim');return}
		        	skelly.sprite.body.velocity.x = 0
		        	skelly.sprite.body.velocity.y = enemySpeed;
		        	skelly.sprite.animations.play("walkDown",10,false)
		        	
		        }
		        else if (skelly.enemyDirection == "E") {
		        	if(!skelly.alive){console.log('hes ded jim');return}
		        	skelly.sprite.body.velocity.x = enemySpeed;
		        	skelly.sprite.body.velocity.y = 0
		        	skelly.sprite.animations.play("walkRight",10,false)
		        	
		        }
		        else if (skelly.enemyDirection == "W")
		        {
		        	if(!skelly.alive){console.log('hes ded jim');return}
		        	skelly.sprite.body.velocity.x = -enemySpeed;
		        	skelly.sprite.body.velocity.y = 0
		        	skelly.sprite.animations.play("walkLeft",10,false)
		        }

		        else if (skelly.enemyDirection == "STOP")
		        {
		        	if(!skelly.alive){console.log('hes ded jim');return}
		        	skelly.sprite.body.velocity.x = 0;
		        	skelly.sprite.body.velocity.y = 0;
		        }
		        else // JUST IN CASE IF enemyDirection wouldnt exist we stop the skelly.sprite movement
		        {
		        	if(!skelly.alive){console.log('hes ded jim');return}
		        	skelly.sprite.body.velocity.x = 0;
		        	skelly.sprite.body.velocity.y = 0;
		        }
		        //update skelly position

		        skelly.currentSkellyXTile = Math.floor(skelly.sprite.position.x/tileSize)
				skelly.currentSkellyYTile = Math.floor(skelly.sprite.position.y/tileSize)
			    
		})
    if (keyAct.isDown) { //using the action key

        if (man.body.blocked.right) {
            // running into a wall on the right

        } else if (man.body.blocked.left) {
            // running into a wall on the left

        } else if (man.body.blocked.up) {
            // hitting something above

        } else if (man.body.blocked.down) {

            // console.log(man)

            // on the ground. same as man.body.onFloor() ??

        }
    } else if (keyAttack.isDown) {
    	if (man.inventory.weapon.name == 'sword'){
    		slash(man)
    	}
    }
    if (man.hp <= 0) {
        man.alive = false
        death(man)
    }
    skellyArr.forEach(function(skelly){
    	if(skelly.hp<=0){
    		
    	}
    })
    currentPlayerXtile = Math.floor(man.body.position.x / tileSize);
	currentPlayerYtile = Math.floor(man.body.position.y / tileSize);	



},
render: function() {
    // game.debug.bodyInfo(man, 20, 150)
    // game.debug.spriteInfo(man, 20, 32);
    // game.debug.cameraInfo(game.camera, 32, 500)

}


}