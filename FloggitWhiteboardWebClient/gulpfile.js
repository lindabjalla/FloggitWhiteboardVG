/* eslint import/no-extraneous-dependencies: ["off", {"devDependencies": false}] */
const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const server = require('gulp-server-livereload');

gulp.task('webserver', () => {
  gulp.src('./dist')
    .pipe(server({
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('css', () =>
  gulp.src(['./src/css/reset.css', './src/css/bootstrap-cyborg.css', './src/css/master.css'])
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(concat('master.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
);

gulp.task('html', () => gulp.src('./src/**/*.html')
  .pipe(htmlmin({
    collapseWhitespace: true
  }))
  .pipe(gulp.dest('dist'))
);

gulp.task('javascript', () => browserify(
  './src/js/app.js', {
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('todo.bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist/js'))
);

gulp.task('default', ['webserver', 'html', 'css', 'javascript'], () => {
  gulp.watch('./src/css/**/*.css', ['css']);
  gulp.watch('./src/js/**/*.js*', ['javascript']);
  gulp.watch('./src/**/*.html', ['html']);
});
