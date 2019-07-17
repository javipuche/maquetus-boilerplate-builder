const fs = require('fs')
const browserSync = require('browser-sync')
const { join } = require('path')
const folders = require('./folders')
const gulpMem = require('./gulpMem')
const generatePagesList = require('./generatePagesList')
const env = require('./environment')
const routes = require('../docs/routes')

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
                        handle: async (req, res, next) => {
                            res.setHeader('content-type', 'text/html')
                            res.write(generatePagesList())
                            res.end()
                        }
                    },
                    {
                        route: '/docs/css/documentation.css',
                        handle: async (req, res, next) => {
                            res.setHeader('content-type', 'text/css')
                            res.write(fs.readFileSync(join(__dirname, '../css/documentation.css'), 'utf8'))
                            res.end()
                        }
                    },
                    ...routes
                ]
            }
        })
    }
}

module.exports = server
