var gulp = require('gulp'),
    connect = require('gulp-connect'),
    babel = require("gulp-babel"),
    sass = require('gulp-ruby-sass'),
    webserver = require('gulp-webserver');

// gulp.task('connect', function() {
//     // connect.server({
//     //     port: 3001, 
//     //     root: './src', 
//     //     livereload: true 
//     // });
// });
gulp.task('webserver', function() {
  gulp.src('./src')
    .pipe(webserver({
      livereload: true,
      port:8088,
      open: true
    }));
});
gulp.task('html', function() {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});
gulp.task('sass', function() {
    sass('./src/sass/*.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload());
});
gulp.task('watch', function() {
    gulp.watch('src/sass/*.scss', ['sass']); 
    gulp.watch(['src/*.html'], ['html']);
    gulp.watch(['src/js/*.js'], ['js']); 
});

gulp.task('default', ['webserver', 'watch']);