const browserSync = require('browser-sync')
const folders = require('./folders')
const gulpMem = require('./gulpMem')
const generatePagesList = require('./generatePagesList')
const env = require('./environment')
const { componentPreviewsRoutes } = require('./componentPreviews')

const server = () => {
    if (!env.isProduction && env.isServerUp) {
        browserSync.init({
            notify: false,
            server: {
                baseDir: folders.dist.root,
                middleware: [
                    gulpMem.middleware,
                    {
                        route: '/',
                        handle: (req, res, next) => {
                            res.setHeader('content-type', 'text/html')
                            res.write(generatePagesList())
                            res.end()
                            next()
                        }
                    }, ...componentPreviewsRoutes()
                ]
            }
        })
    }
}

module.exports = server
