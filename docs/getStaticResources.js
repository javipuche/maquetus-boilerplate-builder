const configDocs = require('./config')

const scriptTpl = (script) => `<script src="${script}" charset="utf-8" defer></script>\n`
const styleTpl = (style) => `<link rel="stylesheet" href="${style}" />\n`

const getStaticResources = (assets, tpl) => {
    if (configDocs()) {
        return configDocs()[assets].map((source) => tpl(source)).join('')
    }
}

module.exports = {
    scripts: getStaticResources('previewScripts', scriptTpl),
    styles: getStaticResources('previewStyles', styleTpl)
}
