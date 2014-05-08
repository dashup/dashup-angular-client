var angular = require('angular');

var ngModule = angular.module('dashup.account', [
  require('./directives').name
]);

module.exports = ngModule;