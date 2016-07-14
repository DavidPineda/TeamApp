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
            //ToastService.success('Enviado Correctamente');
            $state.transitionTo('app.resources');
        });
    }
});

app.controller('sentsCtrl', function($scope, ResourceService){
    ResourceService.getResourcesSent()
    .success(function(response){
        $scope.sents = response;
    });
});

app.controller('receivedsCtrl', function($scope, ResourceService){
    ResourceService.getResourcesReceived()
    .success(function(response){
        $scope.receiveds = response;
    });
});

app.controller('detailsCtrl', function($scope, $stateParams, ResourceService){
    if($stateParams.hasOwnProperty('idResource')){
        var idResource = $stateParams.idResource;
        ResourceService.getDetail({id: idResource})
        .success(function(response){
            console.log(response);
            $scope.resource = response;
        });
    }
});