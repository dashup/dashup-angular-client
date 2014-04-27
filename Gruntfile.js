
module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        options: {
          paths: [ 'lib/less', 'bower_components/bootstrap/less' ]
        },
        files: {
          'dist/dashup.css': 'lib/less/dashup.less'
        }
      }
    },
    browserify: {
      options: {
        transform: [ 'brfs' ],
        browserifyOptions: {
          builtins: [ 'fs' ],
          noParse: [
            'node_modules/angular/lib/angular.min.js',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/lodash/dist/lodash.js',
            'node_modules/moment/moment.js',
            'node_modules/marked/lib/marked.js'
          ],
          commondir: false
        },
        bundleOptions: {
          detectGlobals: false,
          insertGlobalVars: []
        }
      },
      development: {
        files: {
          'dist/dashup.js': [ 'lib/js/dashup.js' ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/dashup.min.js': [ 'dist/dashup.js' ]
        }
      }
    },
    copy: {
      resources: {
        files: [
          // index.html
          { expand: true, cwd: 'lib/', src: [ 'index.html' ], dest: 'dist/' },

          // images
          { expand: true, cwd: 'lib/', src: [ 'img/*' ], dest: 'dist/' },

          // fonts
          { expand: true, cwd: 'lib/', src: [ 'font/dashup.*' ], dest: 'dist/' },
        ]
      }
    },
    watch: {
      less: {
        files: [ 'lib/less/*.less' ],
        tasks: [ 'less' ]
      },
      js: {
        files: [
          'lib/js/**/*.js',
          'lib/js/**/*.html'
        ],
        tasks: [ 'browserify:development' ]
      },
      resources: {
        files: [
          'lib/index.html',
          'lib/img/*',
          'lib/font/dashub.*'
        ],
        tasks: [ 'copy:resources' ]
      }
    }
  });

  grunt.registerTask('build', [ 'less', 'browserify', 'copy', 'uglify' ]);

  grunt.registerTask('auto-build', [ 'build', 'watch' ]);

  grunt.registerTask('default', [ 'build' ]);
};
