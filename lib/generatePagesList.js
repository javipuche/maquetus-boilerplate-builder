const fs = require('fs')
const hbs = require('handlebars')
const { join, extname } = require('path')
const fm = require('front-matter')
const directoryTree = require('directory-tree')
const folders = require('../lib/folders')
const pagesListTpl = require('../tpl/pagesListTpl')
const pagesListPartialTpl = require('../tpl/pagesListPartialTpl')

const createLinksObj = (files) => {
    files.forEach((file) => {
        if (file.type === 'directory') {
            createLinksObj(file.children)
        } else {
            const url = file.path.split(join(folders.src.pages, '/'))[1].replace(extname(file.path), '.html')
            const content = fs.readFileSync(file.path, 'utf8')
            const textLink = fm(content).attributes.pagesListTitle
            file['link'] = textLink || file.name.replace(extname(file.path), '')
            file['url'] = url.replace(/\\/g, '/')
        }
    })
}

const sortJson = function (_array) {
    let dir = []
    let file = []

    _array.map((item) => {
        if (item.children) {
            item.children = sortJson(item.children)
            dir.push(item)
        } else {
            file.push(item)
        }
    })

    return [...file, ...dir]
}

const generateIndexPages = () => {
    let links
    let docsLinks

    const pages = directoryTree(folders.src.pages, {
        normalizePath: true,
        extensions: new RegExp('.(hbs|handlebars|html)'),
        exclude: new RegExp(`^${folders.src.docs}$`)
    })

    if (pages) {
        createLinksObj(pages.children)
        links = sortJson(pages.children)
    }

    const docs = directoryTree(folders.src.docs, {
        normalizePath: true,
        extensions: new RegExp('.(hbs|handlebars|html)')
    })

    if (docs) {
        createLinksObj(docs.children)
        docsLinks = sortJson(docs.children)
    }

    hbs.registerHelper('eq', function (a, b, opts) {
        if (a === b) {
            return opts.fn(this)
        } else {
            return opts.inverse(this)
        }
    })

    hbs.registerPartial('pagesList', pagesListPartialTpl())
    const template = hbs.compile(pagesListTpl())
    const html = template({ links: links, docs: docsLinks })
    hbs.unregisterPartial('pagesList')
    hbs.unregisterHelper('eq')
    return html
}

module.exports = generateIndexPages
