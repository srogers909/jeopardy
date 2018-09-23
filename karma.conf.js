const
    webpack = require('webpack'),
    jasmine = require('jasmine-core'),
    webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
      webpack: webpackConfig,
      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: '',
      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine'],
      // list of files / patterns to load in the browser
      files: [
          'node_modules/jquery/dist/jquery.js',
          'node_modules/popper.js/dist/popper.js',
          'node_modules/tooltip.js/dist/tooltip.js',
          'node_modules/underscore/underscore.js',
          'node_modules/angular/angular.js',
          'node_modules/angular-animate/angular-animate.js',
          'node_modules/angular-sanitize/angular-sanitize.js',
          'node_modules/angular-touch/angular-touch.js',
          'node_modules/@uirouter/angularjs/release/angular-ui-router.js',
          'node_modules/angular1-ui-bootstrap4/dist/ui-bootstrap-tpls.js',
          'src/**/*.ts',
      ],
      // list of files / patterns to exclude
      exclude: [
          'node_modules'
      ],
      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
          'src/**/*.ts': ['webpack'],
          'src/**/*.spec.ts': ['webpack', 'coverage'],
      },
      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['progress', 'coverage'],
      // web server port
      port: 9876,
      // enable / disable colors in the output (reporters and logs)
      colors: true,
      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_INFO,
      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,
      // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: ['Chrome'],
      plugins: [
          'karma-chrome-launcher',
          'karma-jasmine',
          'karma-webpack',
          'karma-coverage'
      ],

      mime: {
          'text/x-typescript': ['ts','tsx']
      },

      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
      singleRun: true,
      // Concurrency level
      // how many browser should be started simultaneous
      concurrency: Infinity
  })
};
