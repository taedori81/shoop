/**
 * This file is part of Shoop.
 *
 * Copyright (c) 2012-2015, Shoop Ltd. All rights reserved.
 *
 * This source code is licensed under the AGPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable no-console */
var _ = require("lodash");
var chokidar = require("chokidar");
var gulp = require("gulp");
var gutil = require("gulp-util");

module.exports = function(paths, tasks) {
    var watcher = chokidar.watch(paths, {ignored: /[\/\\]\./, persistent: true});
    var callback = _.debounce(function() {
        gulp.start.apply(gulp, tasks);
    }, 150);
    watcher.on("raw", callback);
    console.log("Watch: " + gutil.colors.green(tasks) + " <= " + gutil.colors.yellow(paths));
    return watcher;
};
