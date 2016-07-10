angular.module('Teamapp').factory('Session', function($http, $state, $rootScope){
   function User(){
       this.logIn = function(user){
           return $http.post('/login', user);
       }

       this.getUser = function(){
           return $http.get('/session', user);
       }

       this.logOut = function(){
           return $http.post('/logout', user);
       }

       this.isLogged = function(user){
           return $http.get('/session', user);
       }       
   }

   var user = new User();
   var Session = {
       logIn: user.logIn,
       getUser: user.getUser,
       isLogged: user.isLogged,
       logOut: user.logOut
   }
   return Session;
});