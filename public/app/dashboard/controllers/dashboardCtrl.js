angular.module('Teamapp').controller('dashboardCtrl', function($scope, DashboardService, Socket){
    $scope.today = new Date();
    $scope.timeline = [];

    DashboardService.getTimeLine()
    .success(function(response){
        $scope.unshiftTimeLine(response);
    });

    $scope.unshiftTimeLine = function(data){
        _.each(data, function(item, i){
            $scope.timeline.unshift(item);
        })
    }

    Socket.on('new:action', function(data){
        $scope.unshiftTimeLine(data);
    })
});