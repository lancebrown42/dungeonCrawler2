var app = angular.module('gameApp', [])
	.controller('gameController', gameController)

	gameController.$inject = ['$http', '$stateParams']

	function gameController($http, $stateParams){
		var gCtrl = this
		gCtrl.kills = []
		gCtrl.score = gCtrl.kills*10
	}