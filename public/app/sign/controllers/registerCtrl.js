angular.module('Teamapp').controller('registerCtrl', function($scope, $http, $state){
   $scope.user = {}; 
   $scope.register = function() {
       $scope.send = true;
       $http.post('/register', $scope.user)
       .then(function(response){
            var data = response.data;
            if(data.success){
                if(data.logged){
                    $state.transitionTo('app.dashboard');                    
                }else{
                    $state.go('login');
                }               
           }else{
              console.log('Error al Registrarse');
              $scope.send = false; 
           }
       })
   }
});