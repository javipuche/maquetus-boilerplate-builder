const fs = require('fs')
const hbs = require('handlebars')
const getComponentPreviewData = require('./getComponentPreviewData')

const compileComponentPreview = (file) => {
    const content = fs.readFileSync(file, 'utf8')
    const data = getComponentPreviewData(file)
    const template = hbs.compile(content)
    return template(data)
}

module.exports = compileComponentPreview
