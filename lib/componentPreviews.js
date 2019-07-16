const fs = require('fs')
const hbs = require('handlebars')
const glob = require('glob')
const { normalize, join, extname, dirname, basename } = require('path')
const previewTpl = require('../tpl/componentPreviewTpl')
const folders = require('./folders')
const config = require('../config.json')

const files = glob.sync(`${folders.src.components}/**/*.{hbs,handlebars,html}`)

const getComponentPath = (file) => normalize(file).split(join(folders.src.components, '/'))[1]

const getData = (file) => {
    const path = file.replace(extname(file), '.data.json')

    if (fs.existsSync(path)) {
        return JSON.parse(fs.readFileSync(path, 'utf8'))
    }
}

const render = (file) => {
    const content = fs.readFileSync(file, 'utf8')
    const data = getData(file)
    const template = hbs.compile(content)
    return template(data)
}

const componentPreviewsRoutes = () => {
    const routes = []

    files.forEach((file) => {
        const route = getComponentPath(file).replace(extname(file), '').replace(/\\/g, '/')

        routes.push({
            route: `/${config.sources.componentsPreview}/${route}`,
            handle: (req, res, next) => {
                res.setHeader('content-type', 'text/html')
                res.write(previewTpl(render(file)))
                res.end()
                next()
            }
        })
    })

    return routes
}

const generateComponentPreviews = () => {
    files.forEach((file) => {
        const basePath = join(folders.dist.componentsPreview, dirname(getComponentPath(file)))

        fs.mkdir(basePath, { recursive: true }, (err) => {
            if (err) throw err
            fs.writeFileSync(join(basePath, basename(file).replace(extname(file), '.html')), previewTpl(render(file)), { flag: 'w' })
        })
    })
}

module.exports = { componentPreviewsRoutes, generateComponentPreviews }
