angular.module("maze",[])
	.controller('mazeCtrl',mazeCtrl)
function mazeCtrl(){
	mCtrl = this;
	mCtrl.counter=0
	mCtrl.map = ['','','','','','','','','','','','','','','',''];
	mCtrl.size = Math.sqrt(mCtrl.map.length)
	var start = locate()
	var tryHard = 5
	var huntCount = 0
	mCtrl.map[start] = '*'
	mCtrl.visited =[]
	kill(start,move())
	function locate(){
		return (Math.floor(Math.random() * mCtrl.map.length))
	}
	function move(){
		return Math.floor(Math.random()*4)
		
	}
	function check(origin,change){
		if(change == 0){//left

			origin-=1
			console.log('left')


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
			if(mCtrl.map[check(index,change)] == '*'||check(index,change)%mCtrl.size==0||!mCtrl.map[check(index,change)]){
				console.log("hunting")
				var newOrigin = Math.floor(Math.random()*mCtrl.visited.length)
				huntCount++
				console.log("Hunt count:",huntCount)
				hunt(newOrigin)


			}
			else {
				kill(index,change)
			}
		}
	}
}


