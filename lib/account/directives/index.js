var angular = require('angular');

var ngModule = angular.module('dashup.account.directives', []);


ngModule.directive('dhAccountControls', require('./accountControls'));


module.exports = ngModule;