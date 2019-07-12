const notifier = require('node-notifier')

const notify = (title, msg) => notifier.notify({ title: title, message: msg, sound: true, wait: false })

module.exports = notify
