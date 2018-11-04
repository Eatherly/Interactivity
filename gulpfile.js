
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('sass' , function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('public/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})); //
});

gulp.task('browser-sync' , function() {
    browserSync({
        server: {
            baseDir: "./"
        },
        notify: false
    });

});



