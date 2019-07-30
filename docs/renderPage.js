const fs = require('fs')
const fm = require('front-matter')
const markdownToHtml = require('../lib/markdownToHtml')
const renderPreviewTag = require('./renderPreviewTag')
const page = require('./singletonPage')

const renderPage = (file, force) => {
    if (page[file] && !force) {
        return page[file]
    }

    const content = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : file
    const attributes = fm(content).attributes
    const body = fm(content).body
    const getH2Titles = /^##\s/gm
    const html = renderPreviewTag(markdownToHtml(body.replace(getH2Titles, '<hr class="c-separator">\n\n## ')))

    page[file] = {
        attributes,
        html
    }

    return page[file]
}

module.exports = renderPage
