const config = require('../config.json')

module.exports = {
    src: {
        root: config.sources.src,
        components: `${config.sources.src}/${config.sources.components}`,
        layouts: `${config.sources.src}/${config.sources.layouts}`,
        pages: `${config.sources.src}/${config.sources.pages}`,
        partials: `${config.sources.src}/${config.sources.partials}`,
        helpers: `${config.sources.src}/${config.sources.helpers}`,
        assets: `${config.sources.src}/${config.sources.assets}`,
        sass: `${config.sources.src}/${config.sources.sass}`,
        sassApp: `${config.sources.src}/${config.sources.sassApp}`,
        js: `${config.sources.src}/${config.sources.js}`,
        jsApp: `${config.sources.src}/${config.sources.jsApp}`,
        fonts: `${config.sources.src}/${config.sources.fonts}`,
        images: `${config.sources.src}/${config.sources.images}`,
        data: `${config.sources.src}/${config.sources.data}`,
        docs: `${config.sources.src}/${config.sources.docs}`
    },
    dist: {
        root: config.sources.dist,
        assets: `${config.sources.dist}/${config.sources.assets}`,
        css: `${config.sources.dist}/${config.sources.css}`,
        js: `${config.sources.dist}/${config.sources.js}`,
        fonts: `${config.sources.dist}/${config.sources.fonts}`,
        images: `${config.sources.dist}/${config.sources.images}`,
        docs: `${config.sources.dist}/${config.sources.docs}`,
        componentPreviews: `${config.sources.dist}/${config.sources.componentPreviews}`
    },
    node_modules: config.sources.node_modules
}
