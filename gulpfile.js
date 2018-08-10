let gulp = require('gulp')
let gutil = require('gulp-util')
let autoprefixer = require('gulp-autoprefixer')
let cssnano = require('gulp-cssnano')
let gulpIf = require('gulp-if')
let plumber = require('gulp-plumber')
let stylus = require('gulp-stylus')
let sourcemaps = require('gulp-sourcemaps')
let ejs = require('gulp-ejs')
let htmlmin = require('gulp-htmlmin')
let rename = require('gulp-rename')
let {NODE_ENV} = process.env
let dev = NODE_ENV === 'development'
let prd = NODE_ENV === 'production'
let config = require('./config')
let webpack
let bundlerConfig
let bundler

let patterns = {
  static: 'src/**/*.{ico,png,svg}',
  styl: 'src/**/*.styl',
  js: 'src/**/*.js',
  ejs: 'src/**/*.ejs'
}

gulp.task('static-copy', () =>
  gulp.src(['src/{img,fonts}/**', 'favicon.ico']).pipe(gulp.dest('dist'))
)

gulp.task('stylus', () =>
  gulp
    .src('src/index.styl')
    .pipe(plumber())
    .pipe(gulpIf(dev, sourcemaps.init()))
    .pipe(
      stylus({
        'include css': true
      })
    )
    .pipe(autoprefixer())
    .pipe(gulpIf(prd, cssnano()))
    .pipe(gulpIf(dev, sourcemaps.write('.')))
    .pipe(gulp.dest('dist'))
)

gulp.task('webpack-init', done => {
  webpack = require('webpack')
  bundlerConfig = require('./webpack.config')
  bundler = webpack(bundlerConfig)
  done()
})

gulp.task('webpack', done => {
  bundler.run(err => {
    if (err !== null && err !== undefined) {
      gutil.log.error('error bundling', err)
    }
    done()
  })
})

gulp.task('ejs', () =>
  gulp
    .src('src/index.ejs')
    .pipe(plumber())
    .pipe(ejs(config))
    .pipe(
      gulpIf(
        prd,
        htmlmin({
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeComments: true,
          useShortDoctype: true
        })
      )
    )
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'))
)

gulp.task('watch', () => {
  gulp.watch(patterns.static, ['static-copy'])
  gulp.watch(patterns.styl, ['stylus'])
  gulp.watch(patterns.js, ['webpack'])
  gulp.watch(patterns.ejs, ['ejs'])
})

gulp.task('dev', [
  'static-copy',
  'stylus',
  'ejs',
  'webpack-init',
  'webpack',
  'watch'
])
gulp.task('prd', ['static-copy', 'stylus', 'ejs', 'webpack-init', 'webpack'])
