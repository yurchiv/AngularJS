(function(){  //IIFE

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', Controller_1)
	.controller('AlreadyBoughtController', Controller_2)
	.service('ShoppingListCheckOffService', shopService);

	Controller_1.$inject = ['ShoppingListCheckOffService'];
	function Controller_1(ShoppingListCheckOffService){
		var ctrl = this;   
		ctrl.items = ShoppingListCheckOffService.toBuy;

		ctrl.temp = ShoppingListCheckOffService.bought;
		ctrl.buyClick = function(item) {
			var idx = ctrl.items.indexOf(item);
			ShoppingListCheckOffService.removeNpush(idx, item);
			console.log(ctrl.items); 
			console.log(ctrl.temp);	 
		};
	}

	Controller_2.$inject = ['ShoppingListCheckOffService'];
	function Controller_2(ShoppingListCheckOffService){
		var ctrl = this;
		ctrl.items = ShoppingListCheckOffService.bought;
	}

	function shopService(){
		var service = this;
		service.toBuy = [
						{name: "Cookies xd",
						  quantity: 10
						},
						{ name: "Apples",
						  quantity: 3
						},
						{ name: "Oreos",
						  quantity: 7
						},
						{ name: "Snickers",
						  quantity: 2
						},
						{ name: "Peanut Butters",
						  quantity: 5
						}, ];

		service.bought = [];

		service.removeNpush = function(idx, itemToAdd){
			service.toBuy.splice(idx,1);
			service.bought.push(itemToAdd);
		};
	}
})();
