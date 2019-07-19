const fs = require('fs')
const fm = require('front-matter')
const markdownToHtml = require('../lib/markdownToHtml')

const renderPage = (file, render = (html) => html) => {
    const content = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : file
    const attributes = fm(content).attributes
    const body = fm(content).body
    const html = render(markdownToHtml(body))

    return {
        attributes,
        html
    }
}

module.exports = renderPage
