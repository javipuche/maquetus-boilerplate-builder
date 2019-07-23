const fs = require('fs')
const folders = require('../lib/folders')

const config = () => {
    if (fs.existsSync(`${folders.src.docs}/config.json`)) {
        return JSON.parse(fs.readFileSync(`${folders.src.docs}/config.json`, 'utf8'))
    }
}

module.exports = config
