const gulp = require('gulp')
const maquetus = require('maquetus')
const plumber = require('gulp-plumber')
const gulpMem = require('../lib/gulpMem')
const folders = require('../lib/folders')

const template = () =>
    gulp.src(`${folders.src.pages}/**/*.hbs`)
        .pipe(maquetus({
            layouts: folders.src.layouts,
            partials: {
                partials: folders.src.partials,
                components: folders.src.components
            },
            helpers: folders.src.helpers,
            data: folders.src.data,
            hbsOptions: {
                explicitPartialContext: true
            }
        }))
        .pipe(plumber())
        .pipe(gulpMem.dest(folders.dist.root))

module.exports = template
