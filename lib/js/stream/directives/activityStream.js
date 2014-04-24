var moment = require('moment'),
    fs = require('fs');


/**
 * The activity stream directive controller
 */
var Controller = [ '$scope', '$location', 'Streams', function($scope, $location, Streams) {

  var stream;

  $scope.differentDate = function(a, b) {
    if (!b) {
      return true;
    }

    return moment(a.created_at).fromNow() !==
           moment(b.created_at).fromNow();
  };

  $scope.syncStream = function() {
    if ($scope.synchronizing) {
      return;
    }

    $scope.synchronizing = true;

    stream.sync().then(function() {
      $scope.synchronizing = false;
    }, function() {
      $scope.synchronizing = false;
    });
  };

  this.initStream = function(id) {
    if (!id) {
      throw new Error('no activity stream id given');
    }

    $scope.stream = stream = Streams.get(id);
    $scope.$emit('stream.init', stream);
  };

  function loadResults(results) {
    $scope.loading = false;
    $scope.streamData = results;
  }

  function handleError(error) {
    $scope.loading = false;

    $scope.error = {
      status: error.status,
      message: error.data && error.data.message ? error.data.message : error.data
    };
  }

  function reload() {
    $scope.loading = true;
    $scope.error = false;

    stream.search($scope.filter).then(loadResults, handleError);
  }

  // supported filters
  //
  // fromDate, toDate, text, repo
  $scope.filter = { token: $location.search().token };

  $scope.$on('stream.init', function(e, stream) {
    reload();
  });

  $scope.$on('$destroy', function() {
    if (stream) {
      stream.destroy();
    }
  });
}];


var directiveTemplate = fs.readFileSync(__dirname + '/activityStream.html', { encoding: 'utf-8' });

/**
 * The activity stream directive
 */
module.exports = function() {
  return {
    scope: {
      streamId: '='
    },
    controller: Controller,
    template: directiveTemplate,
    link: function(scope, element, attrs, controller) {
      controller.initStream(scope.streamId);
    }
  };
};