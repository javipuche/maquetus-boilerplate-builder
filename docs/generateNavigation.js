const glob = require('glob')
const { basename, extname } = require('path')
const configDocs = require('./config')
const renderPage = require('./renderPage')
const stringToSlug = require('../utils/stringToSlug')
const config = require('../config.json')
const folders = require('../lib/folders')
const files = glob.sync(`${folders.src.docs}/**/*.md`)

const eqActiveUrlFilename = (url, file) => {
    const filename = file.split(folders.src.root)[1].replace(extname(file), '.html')
    return url === filename
}

const setLinkElement = (level, slug, text, items, pageSlug, isActivePage) => {
    if (items.length && level > items[items.length - 1].level) {
        items = setLinkElement(level, slug, text, items[items.length - 1].items, pageSlug, isActivePage)
    } else {
        items.push({
            level: parseInt(level),
            slug: `#${slug}`,
            id: stringToSlug(text.trim().toLowerCase(), true),
            text: text,
            items: [],
            pageSlug: pageSlug,
            isActive: isActivePage
        })
    }
}

const sortLinks = links => links.sort((a, b) => (configDocs().navigation[a.id] || Infinity) - (configDocs().navigation[b.id] || Infinity))

const getLinks = (url) =>
    files.map((file) => {
        const filename = basename(file).replace(extname(file), '')
        const pageRendered = renderPage(file)
        const attributes = pageRendered.attributes
        const html = pageRendered.html
        const previewRegexp = /<h([1-6])[^>]*\s(id="(.*)")?>(.*)<\/h[1-6]>/g
        let match = previewRegexp.exec(html)
        const items = []
        const pageSlug = `/${config.sources.docs}${file.split(folders.src.docs)[1].replace(extname(file), '.html')}`
        const isActivePage = eqActiveUrlFilename(url, file)

        while (match !== null) {
            setLinkElement(match[1], match[3], match[4], items, pageSlug, isActivePage)
            match = previewRegexp.exec(html)
        }

        return {
            text: attributes.pageTitle ? attributes.pageTitle : filename,
            slug: pageSlug,
            id: stringToSlug(attributes.pageTitle ? attributes.pageTitle : filename, true),
            items: items,
            isActive: isActivePage
        }
    })

const navigationElement = ({ slug, text, pageSlug, level }) => level ? `<a href="${pageSlug ? pageSlug + slug : slug}" class="c-nav__link">${text}</a>` : `<a href="${pageSlug ? pageSlug + slug : slug}" class="c-nav__btn">${text}</a>`

const renderNavigationList = (items, isActive = false) => `
    <ul class="c-nav__list ${isActive ? 'is-open' : ''}">
        ${items.map(item => item.items.length > 0
        ? `<li class="c-nav__item ${item.level ? 'has-submenu' : ''} ${item.isActive && !item.level ? 'is-active' : ''}">${navigationElement(item)}${renderNavigationList(item.items, item.level < 2 || item.level === undefined ? item.isActive : false)}</li>`
        : `<li class="c-nav__item">${navigationElement(item)}</li>`).join('')}
    </ul>
`

const logo = (src) => src ? `<img class="c-logo" src="${src}" alt="Logo" />` : ''

const generateNavigation = (url) => `
    <nav class="c-nav">
        ${logo(configDocs().logo)}
        ${renderNavigationList(sortLinks(getLinks(url)))}
    </nav>
`

module.exports = generateNavigation
