const trimTabs = (s) => {
    const m = s.match(/(\s+)/)
    return (m) ? s.replace(new RegExp('(^|\n)' + m[1], 'g'), '$1') : s
}

module.exports = trimTabs
