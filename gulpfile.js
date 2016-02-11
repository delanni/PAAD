'use strict';

var gulp   = require('gulp');
var karma = require('karma').server;
var path = require('path');

var configFile = path.resolve(__dirname, 'spec/karma.conf.js');
/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  karma.start({
    configFile: configFile,
    singleRun: true
  }, done);
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('dev', function (done) {
  karma.start({
    configFile: configFile,
  }, done);
});
