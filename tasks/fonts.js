const gulp = require('gulp')
const folders = require('../lib/folders')
const gulpMem = require('../lib/gulpMem')

const fonts = () =>
    gulp.src(`${folders.src.fonts}/**/*.{eot,ttf,svg,woff,woff2}`, { since: gulp.lastRun(fonts) })
        .pipe(gulpMem.dest(folders.dist.fonts))

module.exports = fonts
