'use strict';

var angular = require('angular');

var ngModule = angular.module('dashup', [
  require('angular-route').name,
  require('./stream').name,
  require('./about').name,
  require('./home').name
]);

ngModule.config([ '$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);


module.exports = ngModule;