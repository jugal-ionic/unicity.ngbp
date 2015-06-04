angular.module('app.home', [])

.config(function config($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            views: {
                "main": {
                    controller: 'HomeCtrl',
                    templateUrl: 'partials/home/home.tpl.html'
                }
            },
            data: {
                pageTitle: 'Home'
            }
        });
})

.controller('HomeCtrl', function($scope) {
    $scope.test="working!";


});
