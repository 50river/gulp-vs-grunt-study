var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  git = require('gulp-git'),
  jade = require('gulp-jade'),
  connect = require('gulp-connect'),
  sass = require('gulp-sass'),
  readLine = require('readline'),
  read = readLine.createInterface(process.stdin, process.stdout);

var devBranch = 'dev_roana0229';

var srcPath = {
  'all': 'src/**',
  'home': 'src/',
  'jade': 'src/*.jade',
  'sass': 'src/*.sass'
};

var buildPath = {
  'all': 'build/**',
  'home': 'build/'
};

gulp.task('default', ['watch']);
gulp.task('watch', ['live', 'watch-sass', 'watch-jade']);

gulp.task('watch-jade', function(){
  gulp.watch(srcPath.jade, ['cnv-jade']);
});

gulp.task('cnv-jade', function(){
  gulp.src(srcPath.jade)
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('src/'));
});

gulp.task('watch-sass', function(){
  gulp.watch(srcPath.sass, ['cnv-sass']);
});

gulp.task('cnv-sass', function(){
  gulp.src(srcPath.sass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('src/'));
});

gulp.task('live', ['connect'], function() {
  gulp.watch(srcPath.all).on('change', function(file) {
    gulp.src(file.path).pipe(connect.reload());
  });
});

gulp.task('connect', function() {
  connect.server({
    root: srcPath.home,
    port: 8080,
    livereload: true
  });
});

gulp.task('live-build', ['connect-build'], function() {
  gulp.watch(buildPath.all).on('change', function(file) {
    gulp.src(file.path).pipe(connect.reload());
  });
});

gulp.task('connect-build', function() {
  connect.server({
    root: buildPath.home,
    port: 8080,
    livereload: true
  });
});

gulp.task('init', function(){
  git.init();
});

gulp.task('clone', function(){
  git.clone('https://github.com/50river/gulp-vs-grunt-study.git');
});

gulp.task('init', function(){
  git.init();
});

gulp.task('clone', function(){
  git.clone(gitURL);
});

gulp.task('checkout', function(){
  return read.question("> Which Branch ?\n", function(answer) {
    gulp.src('./').pipe(git.checkout(answer));
    read.close();
  });
});

gulp.task('add', function(){
  return read.question("> Select Add Files\n", function(answer) {
    gulp.src(answer).pipe(git.add());
    read.close();
  });
});

gulp.task('commit', function(){
  return read.question("> Commit Message\n", function(answer) {
    gulp.src('./').pipe(git.commit(answer));
    read.close();
  });
});

gulp.task('push', function(){
  return read.question("> Which branch ?\n", function(answer) {
    git.push('origin', answer).end();
    read.close();
  });
});

gulp.task('pull', function(){
  return read.question("> Which Branch ?\n", function(answer) {
    git.pull('origin', answer, {args: '--rebase'});
    read.close();
  });
});

gulp.task('merge', function(){
  return read.question("> Which Branch ?\n", function(answer) {
    git.merge(answer);
    read.close();
  });
});

gulp.task('reset', function(){
  return read.question("> Which Branch ?\n", function(answer) {
    git.reset(answer);
    read.close();
  });
});

gulp.task('branch', function(){
  return read.question("> What BranchName ?\n", function(answer) {
    git.branch(answer);
    read.close();
  });
});
