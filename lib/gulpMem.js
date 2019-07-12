const gulp = require('gulp')
const GulpMem = require('gulp-mem')
const env = require('./environment')
const folders = require('./folders')

let gulpMem

if (env.isServerUp) {
    gulpMem = new GulpMem()
    gulpMem.serveBasePath = folders.dist.root
    gulpMem.enableLog = false
} else {
    gulpMem = gulp
}

module.exports = gulpMem
