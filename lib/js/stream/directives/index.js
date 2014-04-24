var angular = require('angular'),
    jquery = require('jquery');

var marked = require('marked'),
    fs = require('fs');


var ngModule = angular.module('dashup.stream.directives', []);


ngModule.directive('dhActivityStream', require('./activityStream'));


var dhEventTemplate = fs.readFileSync(__dirname + '/event.html', { encoding: 'utf-8' });

ngModule.directive('dhEvent', function() {
  return {
    scope: {
      event: '=data'
    },
    template: dhEventTemplate,
  };
});


var dhUserTemplate = fs.readFileSync(__dirname + '/user.html', { encoding: { encoding: 'utf-8' } });

ngModule.directive('dhUser', function() {
  return {
    scope: {
      user: '=data'
    },
    template: dhUserTemplate
  };
});


var dhIssueTemplate = fs.readFileSync(__dirname + '/issue.html', { encoding: { encoding: 'utf-8' } });

ngModule.directive('dhIssue', function() {
  return {
    scope: {
      issue: '=data'
    },
    template: dhIssueTemplate
  };
});


var dhCommentTemplate = fs.readFileSync(__dirname + '/comment.html', { encoding: { encoding: 'utf-8' } });

ngModule.directive('dhComment', [ '$sce', function($sce) {
  return {
    scope: {
      comment: '=data'
    },
    template: dhCommentTemplate,
    link: function(scope) {
      var comment = scope.comment;
      comment.body_html = $sce.trustAsHtml(marked(comment.body));
    }
  };
}]);


var dhTeamTemplate = fs.readFileSync(__dirname + '/team.html', { encoding: { encoding: 'utf-8' } });

ngModule.directive('dhTeam', function() {
  return {
    scope: {
      team: '=data'
    },
    template: dhTeamTemplate
  };
});


var dhRepoTemplate = fs.readFileSync(__dirname + '/repo.html', { encoding: { encoding: 'utf-8' } });

ngModule.directive('dhRepo', function() {
  return {
    scope: {
      repo: '=data'
    },
    template: dhRepoTemplate
  };
});


var dhPullRequestTemplate = fs.readFileSync(__dirname + '/pullRequest.html', { encoding: { encoding: 'utf-8' } });

ngModule.directive('dhPullRequest', function() {
  return {
    scope: {
      pullRequest: '=data'
    },
    template: dhPullRequestTemplate
  };
});


var dhRefTemplate = fs.readFileSync(__dirname + '/ref.html', { encoding: { encoding: 'utf-8' } });

ngModule.directive('dhRef', function() {
  return {
    scope: {
      ref: '=data',
      repo: '=repo'
    },
    template: dhRefTemplate,
    link: function(scope) {
      var ref = scope.ref;

      ref.name = ref.ref.split(/\//).pop();
    }
  };
});


var dhCommitTemplate = fs.readFileSync(__dirname + '/commit.html', { encoding: { encoding: 'utf-8' } });

ngModule.directive('dhCommit', function() {
  return {
    scope: {
      commit: '=data',
      repo: '=repo'
    },
    template: dhCommitTemplate,

    link: function(scope) {

      var commit = scope.commit,
          message = commit.message;

      var shortMessage = message.split(/\n\n/)[0];
      if (shortMessage.length > 80) {
        shortMessage = shortMessage.slice(0, 75) + '...';
      }

      commit.shortMessage = shortMessage;
      commit.shortSha = commit.sha.slice(0, 8);
    }
  };
});


var dhExpanderTemplate = fs.readFileSync(__dirname + '/expander.html', { encoding: { encoding: 'utf-8' } });

ngModule.directive('dhExpander', function() {
  return {
    template: dhExpanderTemplate,

    link: function(scope, element, attrs) {

      element.on('click', function(e) {
        e.preventDefault();

        jquery(this).parents('.event').find('.details').toggleClass('hidden');
      });
    }
  };
});


module.exports = ngModule;