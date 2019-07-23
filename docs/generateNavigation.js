const glob = require('glob')
const { basename, extname } = require('path')
const renderPage = require('./renderPage')
const configDocs = require('./config')
const stringToSlug = require('../utils/stringToSlug')
const config = require('../config.json')
const folders = require('../lib/folders')
const files = glob.sync(`${folders.src.docs}/**/*.md`)

const setLinkElement = (level, slug, text, items, pageSlug, isActivePage) => {
    if (items.length && level > items[items.length - 1].level) {
        items = setLinkElement(level, slug, text, items[items.length - 1].items, pageSlug, isActivePage)
    } else {
        items.push({
            level: level,
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

const getLinks = url =>
    files.map((file) => {
        const pageRendered = renderPage(file)
        const html = pageRendered.html
        const attributes = pageRendered.attributes
        const previewRegexp = /<h([1-6])[^>]*\s(id="(.*)")?>(.*)<\/h[1-6]>/g
        let match = previewRegexp.exec(html)
        const items = []
        const fileName = basename(file).replace(extname(file), '')
        const pageSlug = `/${config.sources.docs}${file.split(folders.src.docs)[1].replace(extname(file), '.html')}`
        const isActivePage = url.indexOf(fileName) > -1
        while (match !== null) {
            setLinkElement(match[1], match[3], match[4], items, pageSlug, isActivePage)
            match = previewRegexp.exec(html)
        }

        return {
            text: attributes.pageTitle ? attributes.pageTitle : fileName,
            slug: pageSlug,
            id: stringToSlug(attributes.pageTitle ? attributes.pageTitle : fileName, true),
            items: items,
            isActive: isActivePage
        }
    })

const navigationElement = ({ slug, text, pageSlug, level }) => level ? `<a href="${pageSlug ? pageSlug + slug : slug}" class="c-nav__link">${text}</a>` : `<a href="${pageSlug ? pageSlug + slug : slug}" class="c-nav__btn">$${text}</a>`

const renderNavigationList = (items, isActive) => `
    <ul class="c-nav__list ${isActive ? 'is-open' : 'is-close'}">
        ${items.map(item => item.items.length > 0
        ? `<li class="c-nav__item">${navigationElement(item)} ${renderNavigationList(item.items, item.isActive)}</li>`
        : `<li class="c-nav__item">${navigationElement(item)}</li>`).join('')}
    </ul>
`

const generateNavigation = (url) => `
    <nav class="c-nav">
        ${renderNavigationList(sortLinks(getLinks(url)), true)}
    </nav>
`

module.exports = generateNavigation
