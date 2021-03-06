const gulp = require('gulp')
const reloadBrowser = require('./reloadBrowser')
const env = require('./environment')
const folders = require('./folders')
const template = require('../tasks/template')
const fonts = require('../tasks/fonts')
const images = require('../tasks/images')
const assets = require('../tasks/assets')
const killProcess = require('../lib/killProcess')

const watch = () => {
    if (env.isWatching) {
        const killProcessPaths = [
            `${folders.src.sassApp}/**/*`,
            `${folders.src.jsApp}/**/*`,
            `${folders.src.docs}/**/*`
        ]

        gulp.watch([
            `${folders.src.root}/**/*.{hbs,handlebars,html}`,
            `${folders.src.components}/**/*.json`,
            `${folders.src.helpers}/**/*.js`,
            `${folders.src.data}/**/*.{js,yml,json}`
        ]).on('all', gulp.series(template, reloadBrowser))
        gulp.watch(`${folders.src.docs}/**/*`).on('all', gulp.series(reloadBrowser))
        gulp.watch(`${folders.src.fonts}/**/*.{eot,ttf,svg,woff,woff2}`).on('all', gulp.series(fonts, reloadBrowser))
        gulp.watch(`${folders.src.images}/**/*.{gif,png,jpg,jpeg,svg}`).on('all', gulp.series(images, reloadBrowser))
        gulp.watch([
            `${folders.src.assets}/**/*`,
            `!${folders.src.fonts}/**`,
            `!${folders.src.images}/**`,
            `!${folders.src.js}/**`,
            `!${folders.src.sass}/**`
        ]).on('all', gulp.series(assets, reloadBrowser))
        gulp.watch(killProcessPaths).on('add', gulp.series(killProcess))
        gulp.watch(killProcessPaths).on('unlink', gulp.series(killProcess))
    }
}

module.exports = watch
