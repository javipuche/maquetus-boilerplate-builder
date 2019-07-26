const fs = require('fs')
const fm = require('front-matter')
const page = require('./singletonPage')
const markdownToHtml = require('../lib/markdownToHtml')
const renderPreviewTag = require('./renderPreviewTag')

const renderPage = (file, force) => {
    if (page[file] && !force) {
        return page[file]
    }

    const content = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : file
    const attributes = fm(content).attributes
    const body = fm(content).body
    const regexp = /^##\s/gm
    const html = renderPreviewTag(markdownToHtml(body.replace(regexp, '<hr class="c-separator">\n\n## ')))

    page[file] = {
        attributes,
        html
    }

    return page[file]
}

module.exports = renderPage
