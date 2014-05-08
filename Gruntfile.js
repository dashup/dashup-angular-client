'use strict';

module.exports = function (grunt) {

  /* global process*/

  // configures browsers to run test against
  // any of [ 'PhantomJS', 'Chrome', 'Firefox', 'IE']
  var TEST_BROWSERS = ((process.env.TEST_BROWSERS || '').replace(/^\s+|\s+$/, '') || 'PhantomJS').split(/\s*,\s*/g);


  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);


  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    config: {
      sources: 'lib',
      dist: 'dist',
      assets: 'assets',
      tests: 'test',
      bower_components: 'bower_components'
    },

    less: {
      development: {
        options: {
          paths: [ '<%= config.assets %>/less', '<%= config.bower_components %>/bootstrap/less' ]
        },
        files: {
          '<%= config.dist %>/dashup.css': '<%= config.assets %>/less/dashup.less'
        }
      }
    },

    jshint: {
      src: [
        ['<%= config.sources %>']
      ],
      gruntfile: [
        'Gruntfile.js'
      ],
      options: {
        jshintrc: true
      }
    },

    karma: {
      options: {
        configFile: '<%= config.tests %>/config/karma.unit.js',
      },
      single: {
        singleRun: true,
        autoWatch: false,

        browsers: TEST_BROWSERS,

        browserify: {
          debug: false,
          transform: [ 'brfs' ]
        }
      },
      unit: {
        browsers: TEST_BROWSERS
      }
    },
    browserify: {
      options: {
        transform: [ 'brfs' ],
        browserifyOptions: {
          builtins: [ 'fs' ],
          commondir: false
        },
        bundleOptions: {
          detectGlobals: false,
          insertGlobalVars: []
        }
      },
      app: {
        files: {
          '<%= config.dist %>/dashup.js': [ '<%= config.sources %>/dashup.js' ]
        }
      },
      watch: {
        options: {
          watch: true,
          keepalive: true
        },
        files: {
          '<%= config.dist %>/bpmn.js': [ '<%= config.sources %>/**/*.js' ],
          '<%= config.dist %>/bpmn-viewer.js': [ '<%= config.sources %>/lib/Viewer.js' ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= config.dist %>/dashup.min.js': [ '<%= config.dist %>/dashup.js' ]
        }
      }
    },
    copy: {
      resources: {
        files: [
          // index.html
          { expand: true, cwd: 'lib/', src: [ 'index.html' ], dest: 'dist/' },

          // images
          { expand: true, cwd: 'assets/', src: [ 'img/**/*' ], dest: 'dist/' },

          // fonts
          { expand: true, cwd: 'assets/', src: [ 'font/dashup.*' ], dest: 'dist/' },
        ]
      }
    },
    watch: {
      less: {
        files: [ '<%= config.assets %>/less/*.less' ],
        tasks: [ 'less' ]
      },
      resources: {
        files: [
          '<%= config.assets %>/img/**/*',
          '<%= config.assets %>/font/dashub.*'
        ],
        tasks: [ 'copy:resources' ]
      }
    }
  });

  grunt.registerTask('build', [ 'less', 'browserify:app', 'copy', 'uglify' ]);

  grunt.registerTask('auto-build', [
    'less', 'copy',
    'browserify:watch',
    'watch'
  ]);

  grunt.registerTask('default', [ 'build' ]);
};
