var angular = require('angular');


var ngModule = angular.module('dashup.stream.streams', []);

/**
 * A provider for streams configured for the application
 */
ngModule.provider('Streams', function() {

  var streams = {};

  this.$get = [ 'streamFactory', function(streamFactory) {

    function createStream(id) {
      var stream = streamFactory({ id: id });

      stream.on('destroy', function() {
        delete streams[id];
      });

      streams[id] = stream;

      return stream;
    }

    function getStream(id) {
      var stream = streams[id];

      if (!stream) {
        stream = createStream(id);
      }

      return stream;
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
      get: getStream
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

      $http.post(baseUrl + '/sync').then(function(data) {
        deferred.resolve(data);
      }, function(response) {
        deferred.reject({ status: response.status, data: response.data });
      });

      return deferred.promise;
    };

    this.search = function(filter) {

      var deferred = $q.defer();

      var params = [];

      angular.forEach(filter, function(v, k) {
        params.push(k + '=' + encodeURIComponent(v));
      });

      var paramStr = params.sort().join('&');

      $http.get(baseUrl + (paramStr ? '?' + paramStr : '')).then(function(response) {
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