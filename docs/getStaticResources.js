const fs = require('fs')
const folders = require('../lib/folders')

const scriptTpl = (script) => `<script src="${script}" charset="utf-8" defer></script>\n`
const styleTpl = (style) => `<link rel="stylesheet" href="${style}" />\n`

const getStaticResources = (assets, tpl) => {
    if (fs.existsSync(`${folders.src.docs}/config.json`)) {
        const configDocs = JSON.parse(fs.readFileSync(`${folders.src.docs}/config.json`, 'utf8'))
        return configDocs[assets].map((source) => tpl(source)).join('')
    }
}

module.exports = {
    scripts: getStaticResources('previewScripts', scriptTpl),
    styles: getStaticResources('previewStyles', styleTpl)
}
