angular.module('Teamapp').controller('taskCtrl', function($scope, TaskService){
   var checks = [];
   $scope.tasks = [];
   $scope.taskEndeds = [];
   $scope.item_master = {description: '', date: '', ended: false};
   $scope.date = new Date();

   $scope.saveTask = function(){
       TaskService.saveTask({description: $scope.item.description})
       .then(function(response){
           if(response.data.success){
               $scope.tasks.push(response.data.task);
               angular.copy($scope.item_master, $scope.item);
           }
       });
   }

   $scope.sendEndeds = function(){
       var ids = _.map(checks, '_id');
       TaskService.saveTasksEnded({ids: ids})
       .then(function(response){
           _.each(response.data, function(item){
               var item = item;
               _.remove($scope.tasks, function(task){
                   return task._id === item._id;
               });
               $scope.taskEndeds.push(item);
           });
       });
   }

   TaskService.getTask()
   .then(function(response){
       _.each(response.data, function(item) {
            if(item.ended.status == false){
                $scope.tasks.push(item);
            }
       });
   });

   $scope.listOrder = function(response){
       var endeds = [];
       var notEndeds = [];
       _.each(response, function(item){
           if(item.ended.status){
               endeds.push(item);
           }else{
               notEndeds.push(item);
           }
           angular.copy(notEndeds, $scope.task);
           angular.copy(endeds, $scope.taskEndeds);
       });
   }

   TaskService.getTasksEnded()
   .then(function(response){
       $scope.listOrder(response.data);
   });

   $scope.$watchCollection('tasks | filter: {ended: {status: true}}', function(newv, old) {
       checks = newv;
   });

});