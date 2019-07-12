const del = require('del')
const folders = require('../lib/folders')

const cleanDist = () => del(`${folders.dist.root}/**/*`, { force: true })

module.exports = cleanDist
