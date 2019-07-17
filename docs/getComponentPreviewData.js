const fs = require('fs')
const { extname } = require('path')

const getComponentPreviewData = (file) => {
    const path = file.replace(extname(file), '.data.json')

    if (fs.existsSync(path)) {
        return JSON.parse(fs.readFileSync(path, 'utf8'))
    }
}

module.exports = getComponentPreviewData
