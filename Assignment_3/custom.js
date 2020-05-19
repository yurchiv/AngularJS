(function(){
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItems);

	NarrowItDownController.$inject = ['MenuSearchService', '$timeout'];
	function NarrowItDownController(MenuSearchService, $timeout){
		var ctrl = this;
		

		ctrl.narrow = function(){
			console.log("Founded" + ctrl.found);
			var found = MenuSearchService.getMatchedMenuItems(ctrl.search);
			console.log("Founded" + ctrl.found);
			if (ctrl.search === "") {
				found = [];
			}
			$timeout(function(){
				console.log("Founded" + found.length);
				console.log(ctrl.found);
				ctrl.found = found;
			}, 666);
		};

		ctrl.remove = function(idx){
			console.log("Index is:", idx);
			ctrl.found.splice(idx, 1);
		};
	}

	MenuSearchService.$inject = ['$http'];
	function MenuSearchService($http){
		var service = this;
		service.getMatchedMenuItems = function(searchStr){
			var foundedItems = [];

			var response = $http({
				method: 'GET',
				url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
			});
			
			response.then(function(result){
				
				var allItems = result.data.menu_items;
				for (var i = 0; i < allItems.length; i++) {
					//console.log(allItems[i]);
					
					var itemDesc = allItems[i].description.toLowerCase();
					if(itemDesc.indexOf(searchStr.toLowerCase()) != -1){
						foundedItems.push(allItems[i]);
					}
				}

			});

			return foundedItems;
		};
	}

	function FoundItems(){
		var ddo = {
			templateUrl: 'template.html',
			scope: {
				remove: '&onRemove',
				founded: '<foundThem'
			}

		};

		return ddo;
	}


})();