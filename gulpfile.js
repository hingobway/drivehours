const { src, dest, parallel, watch } = require('gulp');
const babel = require('gulp-babel');
const prefix = require('gulp-autoprefixer');

const js = (exports.js = () =>
  src('orig/*.js')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(dest('js/')));

const css = (exports.css = () =>
  src('orig/*.css').pipe(prefix()).pipe(dest('css/')));

const prod = (exports.prod = parallel(js, css));

exports.dev = () => watch('orig/', prod);
