(function(){
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');

	console.log("AT LEAST IM LOGGING");
	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'templates/welcome.template.html'
	})

	.state('view1', {
		url: '/categories',
		templateUrl: 'templates/view1.template.html',
		controller: 'MenuAppController as view1',
		resolve: {
			cats: ['MenuDataService', function(MenuDataService){
				return MenuDataService.getAllCategories();
			}]
		}
	})

	.state('view1.view2', {
		url: '/{short_name}',
		templateUrl: 'templates/view2.template.html',
		controller: 'ItemsController as view2',
		resolve: {
			 cat: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService){
				return MenuDataService.getItemsForCategory($stateParams.short_name);
			 }]
		}
	});
}


}) ();