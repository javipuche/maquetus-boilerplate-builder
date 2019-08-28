const { resolve } = require('path')
const folders = require('./folders')

module.exports = {
    assets: resolve(folders.src.assets),
    sass: resolve(folders.src.sass),
    components: resolve(folders.src.components),
    fonts: resolve(folders.src.fonts),
    images: resolve(folders.src.images),
    modules: resolve(folders.src.modules),
    utils: resolve(folders.src.utils),
    node_modules: resolve(folders.node_modules)
}
