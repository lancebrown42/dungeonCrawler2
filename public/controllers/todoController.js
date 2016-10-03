var app = angular.module('gameApp', [])
	.controller('todoController', todoController)

// todoController.$inject = ['$http', '$stateParams']

function todoController(){
	var todoCtrl = this
	todoCtrl.list = ["something"]
}