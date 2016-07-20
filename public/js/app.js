angular.module('gameApp', ['ui.router'])
    .config(configRouter)

configRouter.$inject = ['$stateProvider', '$urlRouterProvider']
function configRouter($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('landing',{
            url : '/',
            templateUrl : '/index.html',
            controller : 'homeController as hCtrl'
        })
        // .state('game', {
        //     url : '/game',
        //     templateUrl : '/game.html'
        //     // controller : 'gameController as gCtrl'
        // })
        .state('login',{
            url: '/login',
            templateUrl : '/html/login.html',
            controller : 'loginController as lCtrl'
        })

}