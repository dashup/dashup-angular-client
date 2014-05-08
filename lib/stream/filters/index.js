var angular = require('angular');


var ngModule = angular.module('dashup.stream.filters', []);

ngModule.filter('plain', require('./plain'));
ngModule.filter('fromNow', require('./fromNow'));

module.exports = ngModule;