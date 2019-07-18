const fs = require('fs')
const glob = require('glob')
const compileComponentPreview = require('./compileComponentPreview')
const folders = require('../lib/folders')
const renderCode = require('../lib/renderCode')
const previewTagTpl = require('../tpl/previewTagTpl')
const config = require('../config.json')

const renderPreviewTag = (html) => {
    const previewRegexp = /(?:<p>)?@preview\((.*)\)(?:<\/p>)?/gm

    let match = previewRegexp.exec(html)

    while (match !== null) {
        const previewTag = match[0]
        const componentName = match[1]
        const componentFile = glob.sync(`${folders.src.components}/${componentName}.{hbs,handlebars,html}`)[0]
        let replacement

        if (componentFile) {
            const hbsCode = fs.readFileSync(componentFile, 'utf8')
            replacement = previewTagTpl(`/${config.sources.componentPreviews}/${componentName}.html`, renderCode(hbsCode), renderCode(compileComponentPreview(componentFile)))
        } else {
            replacement = `<p class="c-msg c-msg--error">Component "${componentName}" not exists.</p>`
        }

        html = html.replace(previewTag, replacement)
        match = previewRegexp.exec(html)
    }

    return html
}

module.exports = renderPreviewTag
