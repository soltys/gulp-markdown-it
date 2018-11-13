var bump, coffee, del, git, gulp, gutil, inc, spawn, tag;

del = require('del');

gulp = require('gulp');

coffee = require('gulp-coffee');

gutil = require('gulp-util');

bump = require('gulp-bump');

git = require('gulp-git');

tag = require('gulp-tag-version');

spawn = require('child_process').spawn;

inc = function (importance) {
    return gulp.src('./package.json').pipe(bump({
        type: importance
    })).pipe(gulp.dest('./')).pipe(git.commit('bumps package version')).pipe(tag());
};

gulp.task('coffee', function () {
    return gulp.src('index.coffee').pipe(coffee({
        bare: true
    })).pipe(gulp.dest('./'));
});

gulp.task('clean', function (cb) {
    return del(['dist', 'coverage', 'temp'], cb);
});

gulp.task('test', ['coffee'], function () {
    return spawn('npm', ['test'], {
        stdio: 'inherit'
    });
});

gulp.task('md', function () {
    var markdownIt;
    markdownIt = require('./index.coffee');
    return gulp.src('./{,test/,test/fixtures/}*.md').pipe(markdownIt()).pipe(gulp.dest('./temp'));
});

gulp.task('default', ['coffee'], function () {
    return gulp.watch(['./{,test/,test/fixtures/}*.coffee'], ['test']);
});

gulp.task('patch', function () {
    return inc('patch');
});

gulp.task('feature', function () {
    return inc('minor');
});

gulp.task('release', function () {
    return inc('major');
});


