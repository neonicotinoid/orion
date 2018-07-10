var gulp = require('gulp'),
    browsync = require('browser-sync'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger'),
    srcmaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber');

var paths = {
    html: 'src/**/*.html',
    scss: 'scss/*.scss',
    js: 'js/*.js',
}


gulp.task('sass-compile', function () {
    return gulp.src(paths.scss) // Берём все .scss-файлы в папке scss
        // .pipe(plumber())
        .pipe(srcmaps.init())
        .pipe(sass()) // Magic
        .pipe(srcmaps.write())
        .pipe(gulp.dest('docs/css')); // Помещаем скомпилированные CSS файлы в папку /css
});

gulp.task('sass-build', function () {
    return gulp.src(paths.scss) // Берём все .scss-файлы в папке scss
        // .pipe(plumber())
        // .pipe(srcmaps.init())
        .pipe(sass()) // Magic
        // .pipe(srcmaps.write())
        .pipe(gulp.dest('docs/css')); // Помещаем скомпилированные CSS файлы в папку /css
});


gulp.task('cssmini', function () {
    return gulp.src('docs/css/style.css')
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(gulp.dest('docs/css'))
});

gulp.task('jsugly', function () {
    gulp.src('js/*.js')
        .pipe(gulp.dest('docs/js/'));
});

gulp.task('csslibs', function () {
    gulp.src('scss/libs/*.css')
        .pipe(gulp.dest('docs/css/libs'));
});

gulp.task('browser-sync', function () {
    browsync.init([paths.html, paths.scss, paths.js], {
        server: {
            baseDir: 'docs/'
        },
        // proxy: "localhost", // Перенаправляем запросы на локальный сервер (для интеграции с CMS)
        notify: false // Отключаем уведомления от BrowserSync
    });
});

gulp.task('htmlbuild', function () {
    gulp.src('src/*.html') //Выберем исходные файлы
        .pipe(rigger()) //Прогон через rigger
        .pipe(gulp.dest('docs/')) //Складываем их в папку build
        .pipe(browsync.reload({
            stream: true
        })); //И перезагрузим наш сервер для обновлений
});

gulp.task('default', ['sass-compile', 'htmlbuild', 'csslibs', 'jsugly', 'browser-sync'], function () {
    gulp.watch(paths.scss, {readDelay: 2000}, ['sass-compile', 'csslibs']);
    gulp.watch(paths.html, ['htmlbuild']);
    gulp.watch(paths.js, ['jsugly']);
});