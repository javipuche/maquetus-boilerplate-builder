const killProcess = (cb) => {
    console.info('You have moved, created or deleted a file in "sass/app" or "js/app" folder, you need to restart the server.')
    process.kill(process.pid)
}

module.exports = killProcess
