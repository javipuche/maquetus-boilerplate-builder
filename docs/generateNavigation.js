const glob = require('glob')
const { basename, extname } = require('path')
const renderPage = require('./renderPage')
const configDocs = require('./config')
const stringToSlug = require('../utils/stringToSlug')
const config = require('../config.json')
const folders = require('../lib/folders')
const files = glob.sync(`${folders.src.docs}/**/*.md`)

const setLinkElement = (level, slug, text, items, pageSlug) => {
    if (items.length && level > items[items.length - 1].level) {
        items = setLinkElement(level, slug, text, items[items.length - 1].items, pageSlug)
    } else {
        items.push({
            level: level,
            slug: `#${slug}`,
            id: stringToSlug(text.trim().toLowerCase(), true),
            text: text,
            items: [],
            pageSlug: pageSlug
        })
    }
}

const sortLinks = links => links.sort((a, b) => (configDocs().navigation[a.id] || Infinity) - (configDocs().navigation[b.id] || Infinity))

const getLinks = () =>
    files.map((file) => {
        const pageRendered = renderPage(file)
        const html = pageRendered.html
        const attributes = pageRendered.attributes
        const previewRegexp = /<h([1-6])[^>]*\s(id="(.*)")?>(.*)<\/h[1-6]>/g
        let match = previewRegexp.exec(html)
        let items = []
        const fileName = basename(file)
        const pageSlug = `/${config.sources.docs}${file.split(folders.src.docs)[1].replace(extname(file), '.html')}`

        while (match !== null) {
            setLinkElement(match[1], match[3], match[4], items, pageSlug)
            match = previewRegexp.exec(html)
        }

        return {
            text: attributes.pageTitle ? attributes.pageTitle : fileName,
            slug: pageSlug,
            id: stringToSlug(attributes.pageTitle ? attributes.pageTitle : fileName, true),
            items: items
        }
    })

const navigationElement = ({ slug, text, pageSlug, level }) => level ? `<a href="${pageSlug ? pageSlug + slug : slug}" class="c-nav__link">${text}</a>` : `<button class="c-nav__btn">${text}</button>`

const renderNavigationList = (items) => `
    <ul class="c-nav__list">
        ${items.map(item => item.items.length > 0
        ? `<li class="c-nav__item">${navigationElement(item)}${renderNavigationList(item.items)}</li>`
        : `<li class="c-nav__item">${navigationElement(item)}</li>`).join('')}
    </ul>
`

const generateNavigation = () => `
    <nav class="c-nav">
        ${renderNavigationList(sortLinks(getLinks()))}
    </nav>
`

module.exports = generateNavigation
