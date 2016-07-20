angular.module('gameApp', ['ui.router'])
    .config(configRouter)
    .controller('gameController', gameController)

configRouter.$inject = ['$stateProvider', '$urlRouterProvider']
function configRouter($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home',{
            url : '/',
            templateUrl : '/html/home.html',
            // controller : 'homeController as hCtrl'
        })
        .state('game', {
            url : '/game',
            templateUrl : '/html/game.html',
            controller : 'gameController as gCtrl'
        })
        .state('login',{
            url: '/login',
            templateUrl : '/html/login.html',
            controller : 'userController as uCtrl'
        })
    $urlRouterProvider.otherwise('/')
}
gameController.$inject = ['$http', '$stateParams']

    function gameController($http, $stateParams){
        var gCtrl = this
        gCtrl.kills = 0
        gCtrl.score = gCtrl.kills*10
    }
// function() {
//     angular.module('userFactoryMODULE',[])
//       .factory('userFactory',userFactory)

//       userFactory.$inject = ['$http']

//       function userFactory($http){
//         var factoryUser = {}

//         factoryUser.create = function(user){
//           return $http.post('/signup', user)
//         }

//         factoryUser.login = function(user){
//           return $http({
//               method : 'POST',
//               url    : '/login',
//               data   : user
//           })
//         }

//         factoryUser.current = function(){
//           return $http.get('/currentuser')
//         }

//         factoryUser.update = function(user){
//           console.log(user)
//           return $http.put('/api/v1/users/' + user._id , user)
//         }

//         return factoryUser
//       }
// }()