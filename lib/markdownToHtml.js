const marked = require('marked')
const renderCode = require('./renderCode')

const trimTabs = (s) => {
    const m = s.match(/(\s+)/)
    return (m) ? s.replace(new RegExp('(^|\n)' + m[1], 'g'), '$1') : s
}

const markdownToHtml = (code) => {
    const renderer = new marked.Renderer()
    renderer.code = (code, language) => renderCode(language, code)

    return marked(trimTabs(code), { renderer })
}

module.exports = markdownToHtml
