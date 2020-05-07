(function(){
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', lController);

lController.$inject = ['$scope'];

function lController($scope){
	$scope.menu = "";
	$scope.message = "";
	$scope.clicked = function(){
		var menuArr = $scope.menu.split(',');
		var ct = 0;

		for (var i = 0; i < menuArr.length; i++) {
			if ((menuArr[i] != "") && (menuArr[i] != " ")) {
				ct++;
				//console.log(ct);
			}
		}
		displayMessage(ct, $scope);
	};
}

function displayMessage(count, scp){
	if(count == 0){
		scp.message = "Please enter data first!";
	} else if(count <= 3){
		scp.message = "Enjoy!";
	} else{
		scp.message = "Too Much!";
	}
}

})();
