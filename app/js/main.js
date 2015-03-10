var app = angular.module('app', ['ngRoute', 'firebase']);

app.value({
    'fbUrl': 'https://contacts-hw4.firebaseio.com/'
});

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'view/list.html',
            controller: 'IndexCtrl'
        })
        .when('/add', {
            templateUrl: 'view/add.html',
            controller: 'AddCtrl'
        })
        .when('/item/:id', {
            templateUrl: 'view/add.html',
            controller: 'ContactCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}])
app.factory('firebaseFactory', ['fbUrl', '$firebaseArray', function(fbUrl, $firebaseArray) {
    var fb = {},
        ref = new Firebase(fbUrl),
        sync = $firebaseArray(ref);

    fb.listContacts = function() {
        return sync;
    }

    fb.showContact = function(id) {

        var url = fbURL + id,
            ref = new Firebase(url),
            sync = $firebaseObject(ref);

        return sync;

    }
    fb.addContact = function(arr) {
        return $firebaseArray(ref).$add(arr);
        //return sync.$add(arr);
    }

    fb.saveContact = function() {
        return sync.$save();
    }

    fb.deleteContact = function(obj) {
        return sync.$remove(obj);
    }

    return fb;
}])

app.controller('IndexCtrl', ['$scope', '$rootScope', '$firebaseArray', function($scope, $rootScope, $firebaseArray) {

    $scope.data = sync;

    console.log(sync);

    $scope.title = 'Контакты';

}]);
app.controller('AddCtrl', ['$scope', '$rootScope', 'firebaseFactory', function($scope, $rootScope, firebaseFactory) {
    //$rootScope.pageName = 'add';
    $scope.title = 'Добавить контакт'

    $scope.addCont = function(arr) {
        firebaseFactory.addContact(arr);
    }



}]);
