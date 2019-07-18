const glob = require('glob')
const { join, normalize } = require('path')
const folders = require('./folders')
const config = require('../config.json')

const getPath = (entries, path, outpath) => {
    let outputPath = {}

    entries.forEach((item) => {
        outputPath[join(outpath, `${normalize(item).split(join(path, '/'))[1].split('.')[0]}`)] = normalize(item)
    })

    return outputPath
}

const entries = () => {
    const sass = getPath(glob.sync(`${folders.src.sassApp}/**/[^_]*.scss`), folders.src.sassApp, config.sources.css)
    const js = getPath(glob.sync(`${folders.src.jsApp}/**/[^_]*.js`), folders.src.jsApp, config.sources.js)

    return Object.assign(sass, js)
}

module.exports = entries
