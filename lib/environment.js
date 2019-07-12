module.exports = {
    isProduction: process.argv.indexOf('--production') >= 0,
    isServerUp: process.argv.indexOf('--server') >= 0,
    isWatching: process.argv.indexOf('--watch') >= 0
}
