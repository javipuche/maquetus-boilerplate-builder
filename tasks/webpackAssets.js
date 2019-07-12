const gulp = require('gulp')
const glob = require('glob')
const plumber = require('gulp-plumber')
const webpackLib = require('webpack')
const webpackStream = require('webpack-stream')
const server = require('../lib/server')
const watch = require('../lib/watch')
const reloadBrowser = require('../lib/reloadBrowser')
const entries = require('../lib/getWebpackEntries')
const notify = require('../lib/notify')
const env = require('../lib/environment')
const folders = require('../lib/folders')
const gulpMem = require('../lib/gulpMem')

const webpackAssets = () => {
    const webpackOptions = { watch: !!env.isWatching, entry: entries() }
    const webpackConfigFile = require('../webpack/webpack.config')()
    const webpackConfig = Object.assign(webpackConfigFile, webpackOptions)
    let runFirstTime = true

    return gulp.src(glob.sync(`${folders.src.jsApp}/**/*.js`))
        .pipe(webpackStream(webpackConfig, webpackLib, (err, stats) => {
            if (err || stats.compilation.errors.length) {
                notify('Error in webpack assets', stats.compilation.errors.toString())
                stats.compilation.errors.forEach((err) => console.log(err))
            } else {
                if (runFirstTime) {
                    server()
                    watch()
                } else {
                    reloadBrowser()
                }
                runFirstTime = false
            }
        }))
        .pipe(plumber())
        .pipe(gulpMem.dest(folders.dist.root))
}

module.exports = webpackAssets
