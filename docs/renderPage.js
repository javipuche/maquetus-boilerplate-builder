const fs = require('fs')
const markdownToHtml = require('../lib/markdownToHtml')

const renderPage = (file, render = (html) => html) => {
    const content = fs.readFileSync(file, 'utf8')
    let html = render(markdownToHtml(content))
    return html
}

module.exports = renderPage
