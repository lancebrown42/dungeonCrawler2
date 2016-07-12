angular.module("maze",[])
	.controller('mazeCtrl',mazeCtrl)
function mazeCtrl(){
	mCtrl = this;
	mCtrl.map = ['','','','','','','','','','','','','','','',''];
	mCtrl.size = Math.sqrt(mCtrl.map.length)
	var start = Math.floor(Math.random() * mCtrl.map.length)
	mCtrl.map[start] = '*'
	function kill(){
		
		var checkRand = Math.floor(Math.random()*4)
		if(checkRand == 0){//left
			mCtrl.map[start - 1] = '*'

		} else if(checkRand == 1){ //right
			mCtrl.map[start + 1] = '*'

		}else if(checkRand == 2){ //up
			mCtrl.map[start - mCtrl.size] = '*'

		}
		else{ //down
			mCtrl.map[start + mCtrl.size] = '*'

		}
	}
}


