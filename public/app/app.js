var app = angular.module('Teamapp',['ui.router', 'ngAnimate', 'toastr']);

app.config(['$stateProvider',"$urlRouterProvider", function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/app/dashboard');
	$stateProvider.state('app',{		
		url: '/app',
		templateUrl: 'partials/index/templates/index.html',
		controller: 'indexCtrl'
	}).state('app.dashboard',{
		url: '/dashboard',
		templateUrl: 'partials/dashboard/templates/dashboard.html',
		controller: 'dashboardCtrl'
	}).state('app.chat',{
		url: '/chat',
		templateUrl: 'partials/chat/templates/chat.html',
	}).state('app.task',{
		url: '/task',
		templateUrl: 'partials/task/templates/task.html',
		controller: 'taskCtrl'
	}).state('app.resources',{
		url: '/resources',
		templateUrl: 'partials/resources/templates/resources.html',
		controller: 'resourceCtrl'
	}).state('app.resources.create',{
		url: '/create',
		templateUrl: 'partials/resources/templates/create.html',
		controller: 'resourceCtrl'
	}).state('register',{
		url: '/register',
		templateUrl: 'partials/sign/templates/register.html',
		controller: 'registerCtrl'
	}).state('login',{
		url: '/login',
		templateUrl: 'partials/sign/templates/login.html',
		controller: 'loginCtrl'
	});	
}]);