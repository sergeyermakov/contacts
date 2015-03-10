var app = angular.module('app', ['ngRoute', 'firebase']);

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
		.otherwise({redirectTo:'/'});
}])

app.controller('IndexCtrl', ['$scope', '$rootScope', '$firebaseArray', function ($scope, $rootScope, $firebaseArray) {
	
	var ref = new Firebase("https://contacts-hw4.firebaseio.com/"),
		sync = $firebaseArray(ref);

	$scope.data = sync;

	console.log(sync);

	$scope.title = 'Контакты';
	
	// $scope.items = {
	// 	'title1': 'New',
	// 	'title4': 'New',
	// 	'title3': 'New',
	// 	'title2': 'New',
	// }
}]);
app.controller('AddCtrl', ['$scope', '$rootScope', '$firebaseArray', function ($scope, $rootScope, $firebaseArray) {
	
	var ref = new Firebase("https://contacts-hw4.firebaseio.com/"),
		sync = $firebaseArray(ref);

	$scope.data = sync;

	console.log(sync);

	$scope.title = 'Добавить контакт';
	
	// $scope.items = {
	// 	'title1': 'New',
	// 	'title4': 'New',
	// 	'title3': 'New',
	// 	'title2': 'New',
	// }
}]);