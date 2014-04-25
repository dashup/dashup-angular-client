
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
        browserifyOptions: {
          // noParse: [ 'angular', 'jquery' ]
        }
      },
      development: {
        files: {
          'dist/dashup.js': [ 'lib/js/dashup.js' ]
        },
        options: {
          transform: [ 'brfs' ]
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
      dist: {
        files: [
          'dist/dashup.js'
        ],
        tasks: [ 'uglify:dist' ]
      },
      resources: {
        files: [
          'lib/index.html',
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
