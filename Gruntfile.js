'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').concat(['gruntacular']).forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist',
    componentName: 'alchemy-tables'
  };

  try {
    yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      compass: {
        files: ['app/styles/{,*/}*.{scss,sass}', 'component/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      templates: {
        files: ['component/templates/*.html', 'app/views/*.html'],
        tasks: 'html2js:directives'
      },
      livereload: {
        files: [
          'app/{,*/}*.html',
          'component/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          'app/styles/{,*/}*.scss',
          'app/scripts/{,*/}*.js',
          'component/scripts/{,*/}*.js',
          'app/images/{,*/}*.{png,jpg,jpeg}'
        ],
        tasks: ['livereload']
      }
    },
    connect: {
      livereload: {
        options: {
          port: 9000,
          // Change this to '0.0.0.0' to access the server from outside.
          hostname: '0.0.0.0',
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, ''),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test'),
              mountFolder(connect, 'component')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:3501'
      }
    },
    clean: {
      dist: ['.tmp', 'dist/*.js', 'dist/*.scss', 'dist/*.css'],
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'component/scripts/{,*/}*.js'
      ]
    },
    testacular: {
      unit: {
        configFile: 'testacular.conf.js',
        singleRun: true
      }
    },
    compass: {
      options: {
        sassDir: 'app/styles',
        cssDir: '.tmp/styles',
        imagesDir: 'app/images',
        javascriptsDir: 'app/scripts',
        fontsDir: 'app/styles/fonts',
        importPath: ['app/components', 'component/styles'],
        relativeAssets: true
      },
      dist: {
        files: {
          'dist/tables.scss' : [
            'component/styles/**/*.scss'
          ]
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    html2js: {
      directives: ['component/templates/*.html', 'app/views/*.html'],
    },
    concat: {
      dist: {
        files: {
          'dist/alchemy-tables.js': [
            'component/scripts/**/*.js',
            'component/templates/*.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: 'app/index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: ['dist/{,*/}*.html'],
      css: ['dist/styles/{,*/}*.css'],
      options: {
        dirs: ['dist']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'dist/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          'dist/tables.css': [
            '.tmp/styles/{,*/}*.css',
            'app/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: 'app',
          src: ['*.html', 'views/*.html'],
          dest: 'dist'
        }]
      }
    },
    cdnify: {
      dist: {
        html: ['dist/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/scripts',
          src: '*.js',
          dest: 'dist/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/scripts/scripts.js': [
            'dist/scripts/scripts.js'
          ],
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app',
          dest: 'dist',
          src: [
            '*.{ico,txt}',
            '*.{ico,txt}'
          ]
        },
        {
          expand: true,
          dot: true,
          cwd: 'component/styles',
          dest: 'dist',
          src: [
            './**/*.scss'
          ]
        }]
      }
    }
  });

  var escapeContent = function(content) {
    return content.replace(/"/g, '\\"').replace(/\n/g, '" +\n    "');
  };

  grunt.registerMultiTask('html2js', 'Generate js version of html template.', function() {
    var files = grunt._watch_changed_files || grunt.file.expand(this.data);

    files.forEach(function(file) {
      var content  = escapeContent(grunt.file.read(file)),
          template = '';

      template += 'angular.module("' + file + '", []).run(function($templateCache) {\n';
      template += '  $templateCache.put("' + file + '",\n';
      template += '    "' + content + '");\n';
      template += '});\n';

      grunt.file.write(file + '.js', template);
    });
  });

  grunt.renameTask('regarde', 'watch');
  // remove when mincss task is renamed
  grunt.renameTask('mincss', 'cssmin');

  grunt.registerTask('server', [
    'clean:server',
    'compass:server',
    'html2js',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'compass',
    'html2js',
    'connect:test',
    'testacular'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'test',
    'compass:dist',
    'html2js',
    //'useminPrepare',
    //'imagemin',
    'cssmin',
    'concat',
    'copy',
    //'cdnify',
    //'usemin',
    //'ngmin',
    //'uglify'
  ]);

  grunt.registerTask('default', ['build']);
};
