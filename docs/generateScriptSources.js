const fs = require('fs')
const folders = require('../lib/folders')

const generateScriptSources = () => {
    const configDocs = JSON.parse(fs.readFileSync(`${folders.src.docs}/config.json`, 'utf8'))
    let scripts = ''

    configDocs.previewScripts.forEach((script) => {
        scripts += `<script src="${script}" charset="utf-8" defer></script>\n`
    })

    return scripts
}

module.exports = generateScriptSources
