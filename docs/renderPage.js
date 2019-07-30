const fs = require('fs')
const fm = require('front-matter')
const markdownToHtml = require('../lib/markdownToHtml')
const renderPreviewTag = require('./renderPreviewTag')
const generateNavigation = require('./generateNavigation')

const renderPage = (file, url) => {
    const content = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : file
    const attributes = fm(content).attributes
    const body = fm(content).body
    const getH2Titles = /^##\s/gm
    const html = renderPreviewTag(markdownToHtml(body.replace(getH2Titles, '<hr class="c-separator">\n\n## ')))
    const navigation = generateNavigation(url, { html, attributes })

    return {
        attributes,
        html,
        navigation
    }
}

module.exports = renderPage
