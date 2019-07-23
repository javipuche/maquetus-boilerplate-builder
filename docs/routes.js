const glob = require('glob')
const { normalize, join, extname } = require('path')
const compileComponentPreview = require('./compileComponentPreview')
const renderPage = require('./renderPage')
const getStaticResources = require('./getStaticResources')
const generateNavigation = require('./generateNavigation')
const renderPreviewTag = require('./renderPreviewTag')
const config = require('../config.json')
const folders = require('../lib/folders')
const componentPreviewTpl = require('../tpl/componentPreviewTpl')
const documentationTpl = require('../tpl/documentationTpl')

const components = glob.sync(`${folders.src.components}/**/*.{hbs,handlebars,html}`)
const docsPages = glob.sync(`${folders.src.docs}/**/*.md`)
const routes = []

const createUrl = (file, srcPath, distPath) => {
    const url = normalize(file).split(join(srcPath, '/'))[1].replace(extname(file), '').replace(/\\/g, '/')
    return `/${distPath}/${url}.html`
}

const createRoute = (url, documentCode) => {
    return {
        route: url,
        handle: async (req, res, next) => {
            res.setHeader('content-type', 'text/html')
            res.write(documentCode(req.originalUrl))
            res.end()
        }
    }
}

if (components) {
    components.forEach((file) => {
        const url = createUrl(file, folders.src.components, config.sources.componentPreviews)
        routes.push(
            createRoute(url, () =>
                componentPreviewTpl(renderPreviewTag(compileComponentPreview(file)), getStaticResources.styles, getStaticResources.scripts)
            )
        )
    })
}

if (docsPages) {
    docsPages.forEach((file) => {
        const url = createUrl(file, folders.src.docs, config.sources.docs)
        routes.push(
            createRoute(url, (url) => {
                const renderedPage = renderPage(file, true)
                return documentationTpl(renderedPage.html, generateNavigation(url), renderedPage.attributes)
            })
        )
    })
}

module.exports = routes
