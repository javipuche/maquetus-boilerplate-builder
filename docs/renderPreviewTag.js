const fs = require('fs')
const glob = require('glob')
var beautifyHtml = require('js-beautify').html
const compileComponentPreview = require('./compileComponentPreview')
const folders = require('../lib/folders')
const renderCodeSnippet = require('../lib/renderCodeSnippet')
const previewTagTpl = require('../tpl/previewTagTpl')
const config = require('../config.json')

const renderPreviewTag = (html) => {
    const previewRegexp = /(?:<p>)?@preview\((.*?)(?:,\s*(.*?))?\)(?:<\/p>)?(?!<\/code>)/g
    let match = previewRegexp.exec(html)

    while (match !== null) {
        const previewTag = match[0]
        const componentName = match[1]
        const componentFile = glob.sync(`${folders.src.components}/${componentName}.{hbs,handlebars,html}`)[0]
        let replacement

        if (componentFile) {
            const hbsCode = fs.readFileSync(componentFile, 'utf8')
            const url = `/${config.sources.componentPreviews}/${componentName}.html`
            const hbsSnippet = renderCodeSnippet(hbsCode)
            const html = compileComponentPreview(componentFile).replace(/\s+(?=(?:(?:[^"]*"){2})*[^"]*"[^"]*$)/g, ' ')
            const htmlSnippet = renderCodeSnippet(beautifyHtml(html, {
                preserve_newlines: false
            }))

            replacement = previewTagTpl(url, hbsSnippet, htmlSnippet, componentName)
        } else {
            replacement = `<p class="c-msg c-msg--error">Component "${componentName}" not exists.</p>`
        }

        html = html.replace(previewTag, replacement)
        match = previewRegexp.exec(html)
    }

    return html
}

module.exports = renderPreviewTag
