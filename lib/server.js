const browserSync = require('browser-sync')
const folders = require('../lib/folders')
const gulpMem = require('../lib/gulpMem')
const generatePagesList = require('../lib/generatePagesList')
const env = require('../lib/environment')

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
                        handle: function (req, res, next) {
                            res.setHeader('content-type', 'text/html')
                            res.write(generatePagesList())
                            res.end()
                            next()
                        }
                    }
                ]
            }
        })
    }
}

module.exports = server
