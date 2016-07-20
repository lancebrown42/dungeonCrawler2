angular.module('gameApp', ['ui.router'])
    .config(configRouter)

configRouter.$inject = ['$stateProvider', '$urlRouterProvider']
function configRouter($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('landing',{
            url : '/',
            templateUrl : '/index.html',
            // controller : 'homeController as hCtrl'
        })
        .state('game', {
            url : '/game',
            templateUrl : '/game.html'
            // controller : 'gameController as gCtrl'
        })
        .state('login',{
            url: '/login',
            templateUrl : '/html/login.html',
            controller : 'loginController as lCtrl'
        })
    $urlRouterProvider.otherwise('/')
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