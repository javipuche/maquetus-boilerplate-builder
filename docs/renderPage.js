const fs = require('fs')
const fm = require('front-matter')
const page = require('./singletonPage')
const markdownToHtml = require('../lib/markdownToHtml')

const renderPage = (file, render = (html) => html) => {
    if (page[file]) {
        return page[file]
    }

    const content = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : file
    const attributes = fm(content).attributes
    const body = fm(content).body
    const html = render(markdownToHtml(body))

    page[file] = {
        attributes,
        html
    }

    return page[file]
}

module.exports = renderPage
