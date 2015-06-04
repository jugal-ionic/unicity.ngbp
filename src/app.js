angular.module('app', [
    /*===Vendor==*/
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    /*====App=====*/
    'templates-app',
    'app.services',
    'app.directives',
    'app.filters',
    'app.home',
    

])

.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
})

.controller('AppCtrl', function($scope) {

    $scope.$on('$stateChangeSuccess', function(event, toState, ToParams, fromState, fromParams) {
        if (angular.isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle + ' | Unicity Shop';
        }
    });
});
