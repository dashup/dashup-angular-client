var angular = require('angular');

var ngModule = angular.module('dashup.stream', [
  require('./view').name,
  require('./streams').name,
  require('./directives').name,
  require('./filters').name
]);

module.exports = ngModule;