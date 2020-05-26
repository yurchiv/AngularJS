(function(){
'use strict';

angular.module('data')
.component('loader', {
	templateUrl: 'templates/loader.template.html',
	controller: LoaderController
});

LoaderController.$inject = ['$rootScope'];
function LoaderController($rootScope){
	var $ctrl = this;
	var cancellers = [];

	$ctrl.$onInit = function (){
		console.log("logging inside component");
		var cancel = $rootScope.$on('$stateChangeStart', 
						   function(event, toState, toParams, fromState, fromParams, options){
						   		$ctrl.showLoad = true;
						   		console.log("stateChangeFired");
						   });
		cancellers.push(cancel);

		cancel = $rootScope.$on('$stateChangeSuccess', 
						   function(event, toState, toParams, fromState, fromParams){
						   		$ctrl.showLoad = false;
						   		console.log("stateChangeSuccesed");
						   });
		cancellers.push(cancel);

		cancel = $rootScope.$on('$stateChangeError', 
						   function(event, toState, toParams, fromState, fromParams){
						   		$ctrl.showLoad = false;
						   		console.log("stateChangeErrored");
						   });
		cancellers.push(cancel);
	};

	$ctrl.$onDestroy = function (){  //Delete all listeners when component destroyed
		console.log("Destroying Component");
		cancellers.forEach(function(item){
			item();
		});
	};
}

})();
