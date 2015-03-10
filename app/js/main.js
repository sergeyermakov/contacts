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
app.factory('firebaseFactory', ['fbUrl', '$firebaseArray', '$firebaseObject', function(fbUrl, $firebaseArray, $firebaseObject) {
    var fb = {},
        ref = new Firebase(fbUrl),
        sync = $firebaseArray(ref);

    fb.listContacts = function() {
        return sync;
    }

    fb.showContact = function(id) {

        var url = fbUrl + id,
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

app.controller('IndexCtrl', ['$scope', '$rootScope', 'firebaseFactory', '$firebaseArray', function($scope, $rootScope, firebaseFactory, $firebaseArray) {

    $scope.data = firebaseFactory.listContacts();

   

    $scope.title = 'Контакты';

}]);
app.controller('AddCtrl', ['$scope', '$rootScope', 'firebaseFactory', function($scope, $rootScope, firebaseFactory) {
    $rootScope.pageName = 'add';
    $scope.title = 'Добавить контакт'

    $scope.addCont = function(arr) {
        firebaseFactory.addContact(arr);
    }
    $scope.delCont = function(obj) {
        firebaseFactory.deleteContact(obj);
    }




}]);
app.controller('ContactCtrl', ['$scope', '$rootScope', 'firebaseFactory', '$routeParams', function($scope, $rootScope, firebaseFactory, $routeParams) {
    $rootScope.pageName = 'item';
    $scope.title = 'контакт'

    var id =  $routeParams.id;
    $scope.id = id;
    $scope.item = firebaseFactory.showContact(id);
    $scope.delCont = function(obj) {
        firebaseFactory.deleteContact(obj);
    }


}]);
