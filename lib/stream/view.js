var angular = require('angular');

var fs = require('fs');


var ngModule = angular.module('dashup.stream.view', []);

var Controller = [ '$scope', '$routeParams', function($scope, $routeParams) {
  $scope.streamId = $routeParams.streamId;
}];

var viewTemplate = fs.readFileSync(__dirname + '/view.html', { encoding: 'utf-8' });

ngModule.config([ '$routeProvider', function($routeProvider) {

  $routeProvider.when('/s/:streamId', {
    reloadOnSearch: false,
    template: viewTemplate,
    controller: Controller
  });
}]);


module.exports = ngModule;