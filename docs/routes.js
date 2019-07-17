const glob = require('glob')
const { normalize, join, extname } = require('path')
const compileComponentPreview = require('./compileComponentPreview')
const renderPreviewTag = require('./renderPreviewTag')
const generateStyleLinks = require('./generateStyleLinks')
const config = require('../config.json')
const folders = require('../lib/folders')
const componentPreviewTpl = require('../tpl/componentPreviewTpl')
const documentationTpl = require('../tpl/documentationTpl')

const components = glob.sync(`${folders.src.components}/**/*.{hbs,handlebars,html}`)
const docsPages = glob.sync(`${folders.src.docs}/**/*.md`)
const routes = []

const createUrl = (file, srcPath, distPath) => {
    let url = normalize(file).split(join(srcPath, '/'))[1].replace(extname(file), '').replace(/\\/g, '/')
    url = url === 'index' ? `/${distPath}` : `/${distPath}/${url}.html`
    return url
}

const createRoute = (url, documentCode) => {
    return {
        route: url,
        handle: async (req, res, next) => {
            res.setHeader('content-type', 'text/html')
            res.write(documentCode())
            res.end()
        }
    }
}

components.forEach((file) => {
    const url = createUrl(file, folders.src.components, config.sources.componentPreviews)
    routes.push(createRoute(url, () => componentPreviewTpl(compileComponentPreview(file), generateStyleLinks())))
})

docsPages.forEach((file) => {
    const url = createUrl(file, folders.src.docs, config.sources.docs)
    routes.push(createRoute(url, () => documentationTpl(renderPreviewTag(file))))
})

module.exports = routes
