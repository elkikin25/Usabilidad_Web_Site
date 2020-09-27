
const { series, src, dest, watch } = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');


function vendorsJs () {
  return src([
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js.map',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/jquery/dist/jquery.min.map',
    'node_modules/popper.js/dist/umd/popper.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js.map',
  ]).pipe(dest('src/vendors'))
}

function vendorsCss () {
  return src('node_modules/font-awesome/css/font-awesome.min.css').pipe(
    dest('src/css')
  )
}

function fonts () {
  return src('node_modules/font-awesome/fonts/*').pipe(
    dest('src/fonts')
  )
}

function serve() { 
  browserSync.init({ server: './src', port: 3200 })

  watch(['src/scss/*.scss'], function () {
    sassFiles()
  });

  watch('src/*.html').on('change', browserSync.reload);
}

function sassFiles() {
  return src('src/scss/*.scss')
  .pipe( sass())
  .pipe( dest('src/css'))
  .pipe(browserSync.stream())
}

function html () {
  return src('src/index.html').pipe(dest('dist'))
}

exports.default = series(vendorsJs, vendorsCss, fonts,html, serve)