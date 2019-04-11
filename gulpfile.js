'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var rename = require('gulp-rename');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var rollup = require('rollup-stream');
var source = require('vinyl-source-stream');
var pkg = require('./package.json');

var srcDir = './src/';
var outDir = './dist/';


function lintJsTask() {
	var files = [
		srcDir + '**/*.js',
	];

	return gulp.src(files)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
}


function buildTask() {
	return rollup('rollup.config.js')
		.pipe(source(pkg.name + '.js'))
		.pipe(gulp.dest(outDir))
		.pipe(rename(pkg.name + '.min.js'))
		.pipe(streamify(uglify({output: {comments: 'some'}})))
		.pipe(gulp.dest(outDir));

}


function watchTask() {
	buildTask();
	gulp.watch('src/**/*.js', gulp.parallel('lint', 'build'));
}


gulp.task('build', buildTask);
gulp.task('lint', lintJsTask);
gulp.task('watch', watchTask);

