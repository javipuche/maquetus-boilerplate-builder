const gulp = require('gulp')
const folders = require('../lib/folders')
const gulpMem = require('../lib/gulpMem')

const assets = () =>
    gulp.src([
        `${folders.src.assets}/**/*`,
        `!${folders.src.fonts}/**`,
        `!${folders.src.images}/**`,
        `!${folders.src.js}/**`,
        `!${folders.src.sass}/**`
    ], { since: gulp.lastRun(assets) })
        .pipe(gulpMem.dest(folders.dist.assets))

module.exports = assets
