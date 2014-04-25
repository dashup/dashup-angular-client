var angular = require('angular');


var ngModule = angular.module('dashup.stream.streams', []);

/**
 * A provider for streams configured for the application
 */
ngModule.provider('Streams', function() {

  this.$get = [ 'streamFactory', function(streamFactory) {

    function createStream(config) {
      return streamFactory(config);
    }

    return {

      /**
       * Returns the instance of the stream with the given name.
       *
       * @method Streams#get
       *
       * @param {String} name
       * @type {Stream}
       */
      create: createStream
    };
  }];
});


/**
 * A stream factory
 */
ngModule.factory('streamFactory', [ '$http', '$q', function($http, $q) {

  function Stream(config) {

    var baseUrl = '/stream/' + config.id;

    var listeners = {};

    this.id = config.id;


    function parameterizeUrl(url, params) {

      params = angular.extend(config.defaultParams, params || {});

      var parts = [];

      angular.forEach(params, function(v, k) {
        parts.push(k + '=' + encodeURIComponent(v));
      });

      var paramStr = parts.sort().join('&');

      return url + (paramStr ? '?' + paramStr : '');
    }


    this.destroy = function() {
      this.emit('destroy');
    };

    this.on = function(event, fn) {
      var queue = (listeners[event] = listeners[event] || []);
      queue.push(fn);
    };

    this.emit = function() {
      var args = Array.prototype.slice.call(arguments),
          event = args.shift();

      (listeners[event] || []).forEach(function(fn) {
        fn.apply(null, args);
      });
    };

    this.sync = function() {
      var deferred = $q.defer();

      $http.post(parameterizeUrl(baseUrl + '/sync')).then(function(data) {
        deferred.resolve(data);
      }, function(response) {
        deferred.reject({ status: response.status, data: response.data });
      });

      return deferred.promise;
    };

    this.search = function(filter) {

      var deferred = $q.defer();

      var url = parameterizeUrl(baseUrl, filter);

      $http.get(url).then(function(response) {
        deferred.resolve(response.data);
      }, function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };
  }

  return function(config) {
    return new Stream(config);
  };

}]);


module.exports = ngModule;