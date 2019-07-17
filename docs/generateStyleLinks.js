const fs = require('fs')
const folders = require('../lib/folders')

const generateStyleLinks = () => {
    const configDocs = JSON.parse(fs.readFileSync(`${folders.src.docs}/config.json`, 'utf8'))
    let styles = ''

    configDocs.previewStyles.forEach((style) => {
        styles += `<link rel="stylesheet" href="${style}" />\n`
    })

    return styles
}

module.exports = generateStyleLinks
