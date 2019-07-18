const marked = require('marked')
const renderCode = require('./renderCode')
const stringToSlug = require('../utils/stringToSlug')
const trimTabs = require('../utils/trimTabs')

const markdownToHtml = (code) => {
    const renderer = new marked.Renderer()
    renderer.code = (code, language) => renderCode(language, code)
    marked.Slugger.prototype.slug = stringToSlug

    return marked(trimTabs(code), { renderer })
}

module.exports = markdownToHtml
