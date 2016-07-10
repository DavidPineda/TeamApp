angular.module('Teamapp').factory('TaskService', function($http){
    function Task(){
        this.getTask = function(){
            return $http.get('/tasks');
        }

        this.getTasksEnded = function(){
            return $http.get('/tasks/ended');
        }

        this.saveTask = function(data){
            return $http.post('/tasks', data);
        }

        this.saveTasksEnded = function(ids){
            return $http.post('/tasks/ended', ids);
        }
    }

    var task = new Task();
    var TaskService = {
        getTask: task.getTask,
        getTasksEnded: task.getTasksEnded,
        saveTask: task.saveTask,
        saveTasksEnded: task.saveTasksEnded
    }
    return TaskService;
});