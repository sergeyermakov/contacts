var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'view/list.html',
			controller: 'IndexCtrl'
	})
		.when('/add', {
			templateUrl: 'view/add.html',
			controller: 'AddCtrl'
	})
}])

app.controller('IndexCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
	$scope.title = 'Контакты';
	
	$scope.items = {
		'title1': 'New',
		'title4': 'New',
		'title3': 'New',
		'title2': 'New',
	}
}]);