const { resolve } = require('path')
const folders = require('../lib/folders')

module.exports = {
    assets: resolve(folders.src.assets),
    sass: resolve(folders.src.sass),
    components: resolve(folders.src.components),
    fonts: resolve(folders.src.fonts),
    images: resolve(folders.src.images),
    node_modules: resolve(folders.node_modules)
}
