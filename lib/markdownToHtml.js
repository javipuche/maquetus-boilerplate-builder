const marked = require('marked')
const renderCodeSnippet = require('./renderCodeSnippet')
const stringToSlug = require('../utils/stringToSlug')
const trimTabs = require('../utils/trimTabs')

const markdownToHtml = (code) => {
    const renderer = new marked.Renderer()
    renderer.code = (code, language) => renderCodeSnippet(code, language)
    marked.Slugger.prototype.slug = stringToSlug

    return marked(trimTabs(code), { renderer })
}

module.exports = markdownToHtml
