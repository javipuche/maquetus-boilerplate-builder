const glob = require('glob')
const del = require('del')
const { resolve } = require('path')
const deleteEmpty = require('delete-empty')
const folders = require('../lib/folders')

const cleanTmp = async () => {
    await del(glob.sync(`${folders.dist.css}/**/*.js`), { force: true })
    deleteEmpty(resolve(folders.dist.root)).catch(console.error)
}

module.exports = cleanTmp
