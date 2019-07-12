const gulp = require('gulp')
const gulpif = require('gulp-if')
const imagemin = require('gulp-imagemin')
const folders = require('../lib/folders')
const gulpMem = require('../lib/gulpMem')
const env = require('../lib/environment')

const images = () =>
    gulp.src(`${folders.src.images}/**/*.{gif,png,jpg,jpeg,svg}`, { since: gulp.lastRun(images) })
        .pipe(gulpif(env.isProduction || env.isWatching, imagemin({
            progressive: true
        })))
        .pipe(gulpMem.dest(folders.dist.images))

module.exports = images
