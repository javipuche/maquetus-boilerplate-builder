const glob = require('glob')
const { basename, normalize, extname } = require('path')
const renderPage = require('./renderPage')
const config = require('../config.json')
const folders = require('../lib/folders')
const stringToSlug = require('../utils/stringToSlug')
const files = glob.sync(`${folders.src.docs}/**/*.md`)

const setLinkElement = (level, slug, text, items, pageSlug) => {
    if (items.length && level > items[items.length - 1].level) {
        items = setLinkElement(level, slug, text, items[items.length - 1].items)
    } else {
        items.push({
            level: level,
            slug: `#${slug}`,
            text: text,
            items: [],
            pageSlug: pageSlug
        })
    }
}

const getLinks = () =>
    files.map((file) => {
        const html = renderPage(file)
        const previewRegexp = /<h([1-6])[^>]*>(.*)<\/h[1-6]>/g
        let match = previewRegexp.exec(html)
        let items = []
        const fileName = basename(file)
        const pageSlug = `/${config.sources.docs}${file.split(folders.src.docs)[1].replace(extname(file), '.html')}`

        while (match !== null) {
            setLinkElement(match[1], stringToSlug(match[2]), match[2], items, pageSlug)
            match = previewRegexp.exec(html)
        }

        return {
            text: items.length ? items[0].text : fileName,
            slug: pageSlug,
            items: items
        }
    })

const navigationElement = ({ slug, text, pageSlug }) => `<a href="${pageSlug ? pageSlug + slug : slug}" class="c-nav__link">${text}</a>`

const renderNavigationList = (items) => `
    <ul class="c-nav__list">
        ${items.map(item => item.items.length > 0
        ? `<li class="c-nav__item">${navigationElement(item)}${renderNavigationList(item.items)}</li>`
        : `<li class="c-nav__item">${navigationElement(item)}</li>`).join('')}
    </ul>
`

const generateNavigation = () => `
    <nav class="c-layout__nav c-nav">
        ${renderNavigationList(getLinks())}
    </nav>
`

module.exports = generateNavigation
