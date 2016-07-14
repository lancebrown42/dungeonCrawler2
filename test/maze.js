angular.module("maze",[])
	.controller('mazeCtrl',mazeCtrl)
function mazeCtrl(){
	mCtrl = this;
	var mapHeight = 10
	var mapWidth = 10
	mCtrl.counter=0
	mCtrl.map=[];
	mapGen(mapWidth,mapHeight)
	mCtrl.size = Math.sqrt(mCtrl.map.length)
	mCtrl.gui = {}
	gui()
	// console.log(mCtrl.gui)
	var start = locate()
	var tryHard = 50
	var huntCount = 0
	mCtrl.map[start] = '*'
	mCtrl.visited =[]
	kill(start,move())
	function mapGen(width,height){
		for(var i = 0; i<(width*height);i++){
			mCtrl.map.push("_")
		}

	}
	function gui(){
		for(var i = 0; i<mCtrl.map.length; i+=mapWidth){
			mCtrl.gui[i/mapWidth] = mCtrl.map.slice(i,i+mapWidth)
			console.log(mCtrl.map.length/mapHeight)
			
		}
	}
	function locate(){
		return (Math.floor(Math.random() * mCtrl.map.length))
	}
	function move(){
		return Math.floor(Math.random()*4)
		
	}
	function check(origin,change){
		if(change == 0){//left
			origin-=1


		} else if(change == 1){ //right

			origin+=1

		}else if(change == 2){ //up

			origin-=mCtrl.size

		}
		else if(change == 3){ //down

			origin+=mCtrl.size

		}
		else{
			console.log("checker error: change==",change)
			console.log("count end at",mCtrl.counter)
			return
		}
		return origin
	}
	function kill(origin,change){
		console.log("new tile:",check(origin,change))
		mCtrl.map[check(origin,change)] = '*'
		mCtrl.visited.push(check(origin,change))
		// if(checkRand == 0){//left
		// 	mCtrl.map[origin - 1] = '*'
		// 	origin-=1
		// 	console.log('left')

		// } else if(checkRand == 1){ //right
		// 	mCtrl.map[origin + 1] = '*'
		// 	origin+=1

		// }else if(checkRand == 2){ //up
		// 	mCtrl.map[origin - mCtrl.size] = '*'
		// 	origin-=mCtrl.size

		// }
		// else{ //down
		// 	mCtrl.map[origin + mCtrl.size] = '*'
		// 	origin+=mCtrl.size

		// }
		mCtrl.counter++
		hunt(origin)
	}
	function hunt(index){
		if(huntCount <= tryHard){

			var change = move()
			console.log("Checking change ",change," for index ",index)
			var newTile = check(index,change)
			console.log("NewTile =",newTile)

			if(mCtrl.map[newTile] == '*'||newTile%mCtrl.size==0||mCtrl.map[newTile]===undefined||newTile<0){
				console.log("hunting")
				var newOrigin = Math.floor(Math.random()*mCtrl.visited.length)
				huntCount++
				console.log("Hunt count:",huntCount)
				hunt(newOrigin)


			}
			else {
				gui()
				kill(index,change)
			}
		}
		else{
			console.log("Done!")
		}
	}
}


