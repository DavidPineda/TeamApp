angular.module('Teamapp').controller('resourceCtrl', function($scope, $http, $state, ToastService, ResourceService){
    $scope.filesChanged = function(elm) {
        $scope.files = elm.files;
        $scope.$apply();
    }

    $scope.uploadFile = function(){
        var fd = new FormData();
        angular.forEach($scope.files, function(file){
            fd.append('file', file);  
        });
        fd.append('receiver', $scope.receiver);
        fd.append('subject', $scope.subject);
        $http.post('/resource', fd, {
            transformRequest: angular.identity,
            headers: {'content-type': undefined}
        })
        .success(function(d){
            console.log(d);
            //ToastService.success('Enviado Correctamente');
            $state.transitionTo('app.resources');
        });
    }
})