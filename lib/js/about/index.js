var angular = require('angular');

var fs = require('fs');


var ngModule = angular.module('dashup.about', []);

var viewTemplate = fs.readFileSync(__dirname + '/view.html', { encoding: { encoding: 'utf-8' } });

ngModule.config([ '$routeProvider', function($routeProvider) {

  $routeProvider.when('/about', {
    template: viewTemplate
  });
}]);


module.exports = ngModule;