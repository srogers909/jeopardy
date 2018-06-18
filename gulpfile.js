const path = require('path'),
    gulp = require('gulp'),
    less = require('gulp-less'),
    babel = require('gulp-babel'),
    sourceMaps = require('gulp-sourcemaps'),
    pump = require('pump'),
    uglify = require('gulp-uglify'),
    serveStatic = require('serve-static'),
    webServer = require('gulp-webserver'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject');

const _rootPath = path.resolve(__dirname, 'src');

const _jsVendorLibs = [
    '../node_modules/jquery/dist/jquery.min.js',
    '../node_modules/underscore/underscore-min.js',
    '../node_modules/angular/angular.min.js',
    '../node_modules/angular-animate/angular-animate.min.js',
    '../node_modules/angular-sanitize/angular-sanitize.min.js',
    '../node_modules/angular-touch/angular-touch.min.js',
    '../node_modules/@uirouter/angularjs/release/angularjs-ui-router.min.js',
    '../node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
];

const _cssVendorLibs = [
    '../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
];

gulp.task('less', (cb) => {
   pump([
       gulp.src('./src/styles/**/*.less'),
       sourceMaps.init(),
       less(),
       sourceMaps.write('.'),
       gulp.dest('src/styles'),
       connect.reload()
   ], cb);
});

gulp.task('indexHtml', (cb) => {
    pump([
        gulp.src('src/index.html'),
        inject(gulp.src(['src/styles/**/*.css', '!src/styles/**/primary-colors.css'], { read: false }), { name: 'app', relative: true }),
        inject(gulp.src(['src/**/*.js', '!src/vendors.min.js'], { read: false }), { name: 'app', relative: true }),
        inject(gulp.src(_jsVendorLibs, { read: false }), { name: 'vendors', relative: true }),
        gulp.dest('src'),
        connect.reload()
    ], cb);
});

gulp.task('vendorJsCompiler', (cb) => {
    pump([
        gulp.src(_jsVendorLibs),
        sourceMaps.init(),
        concat('vendors.min.js'),
        sourceMaps.write('.'),
        gulp.dest('./src'),
        connect.reload()
    ], cb);
});

gulp.task('vendorCssCompiler', (cb) => {
    pump([
        gulp.src(_cssVendorLibs),
        sourceMaps.init(),
        concat('vendors.min.css'),
        sourceMaps.write('.'),
        gulp.dest('./src'),
        connect.reload()
    ], cb);
});

gulp.task('serve', (cb) => {
    pump([
        gulp.src('./src'),
        webServer({
            port: 9001,
            livereload: true,
            middleware: [(req, res, next) => {
                serveStatic('../node_modules');
                next();
            }]
        })
    ], cb);
});

gulp.task('html', (cb) => {
    pump([

    ], cb);
});

gulp.task('watcher', ['serve'], () => {
    gulp.watch('./src/**/*.less', ['less']);
});

gulp.task('default', ['less', 'js', 'watcher']);