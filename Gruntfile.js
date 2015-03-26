module.exports = function(grunt) {
  var watchFiles = {
    serverJS: ['gruntfile.js', 'server/server.js', 'server/config/**/*.js', 'server/app/**/*.js'],
    mochaTests: ['server/tests/**/*.js']
  };

  grunt.initConfig({

    mochaTest: {
      src: watchFiles.mochaTests,
      options: {
        reporter: 'spec',
        require: 'server/start.js'
      }
    },

    nodemon: {
      dev: {
        script: 'server/start.js',
        options: {
          nodeArgs: ['--debug'],
          ext: 'js,html',
          watch: watchFiles.serverJS
        }
      }
    },

    'node-inspector': {
      custom: {
        options: {
          'web-port': 4202,
          'web-host': 'localhost',
          'debug-port': 5858,
          'save-live-edit': true,
          'no-preload': true,
          'stack-trace-limit': 50,
          'hidden': []
        }
      }
    },

    concurrent: {
      default: ['nodemon'],
      serve: ['nodemon', 'node-inspector', 'shell:serve'],
      options: {
        logConcurrentOutput: true,
        limit: 10
      }
    },

    shell: {
      serve: {
        command: 'ember serve --proxy http://localhost:4201'
      },
      test: {
        command: 'ember test --server'
      }
    },

    env: {
      test: {
        NODE_ENV: 'test'
      }
    },
  });

  grunt.registerTask('serve', ['concurrent:serve']);
  grunt.registerTask('testserver', ['env:test', 'mochaTest']);
  grunt.registerTask('testclient', ['shell:test']);
  grunt.registerTask('default', ['concurrent']);


  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-node-inspector');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-env');
}
