const { generateComponentPreviews } = require('../lib/componentPreviews')

const componentPreviews = (cb) => {
    generateComponentPreviews()
    cb()
}

module.exports = componentPreviews
