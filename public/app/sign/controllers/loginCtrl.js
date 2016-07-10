angular.module('Teamapp').controller('loginCtrl', function($scope, $http, $state, toastF, Session){
    $scope.master = {};
    $scope.signIn = function(){
        var user = {username: $scope.user.username, password: $scope.user.password};
        Session.logIn(user)
        .then(function(response){
            if(response.data.success){
                //toastF.success('Iniciaste Sesion Corretamente');
                $state.transitionTo('app.dashboard');
            }else{
                //toastF.error('Error de Autenticación, Verifica los datos');
                $scope.user = angular.copy($scope.master);
                $scope.form.$setPristine();
            }
        });
    }

    Session.isLogged().then(function(response){
       var isLogged = response.data.isLogged;
       if(isLogged){
           $state.go('app.dashboard');
       } 
    });
});