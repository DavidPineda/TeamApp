var app = angular.module('Teamapp',['ui.router']);

app.config(['$stateProvider',"$urlRouterProvider", function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/app/dashboard');
	$stateProvider.state('app',{
		url: '/app',
		templateUrl: 'partials/index/templates/index.html',
		controller: 'indexCtrl'
	}).state('app.dashboard',{
		url: '/dashboard',
		templateUrl: 'partials/dashboard/templates/dashboard.html',
	}).state('app.chat',{
		url: '/chat',
		templateUrl: 'partials/chat/templates/chat.html',
	}).state('app.task',{
		url: '/task',
		templateUrl: 'partials/task/templates/task.html',
	}).state('app.resources',{
		url: '/resources',
		templateUrl: 'partials/resources/templates/resources.html',
	});
}]);