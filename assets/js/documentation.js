const resizeIframe = (obj) => {
    obj.style.height = obj.contentWindow.document.body.querySelector('*:not(script):not(style)').scrollHeight + 'px'
}

const resizeIframeHeightByContent = () => {
    document.querySelectorAll('iframe').forEach((el) => {
        el.addEventListener('load', (event) => {
            resizeIframe(el)
        })
    })
}

const tabs = () => {
    document.querySelectorAll('[data-tabs-btn]').forEach((el) => {
        el.addEventListener('click', (event) => {
            const id = el.dataset.tabsId
            const target = el.dataset.tabsBtn

            document.querySelectorAll(`[data-tabs-btn][data-tabs-id="${id}"]`).forEach((el) => {
                el.classList.remove('is-active')
            })

            document.querySelectorAll(`[data-tabs-content][data-tabs-id="${id}"]`).forEach((el) => {
                el.classList.remove('is-active')
            })

            el.classList.add('is-active')

            document.querySelectorAll(`[data-tabs-content="${target}"][data-tabs-id="${id}"]`).forEach((el) => {
                el.classList.add('is-active')
            })
        })
    })
}

const nav = () => {
    const locators = {
        menus: 'c-nav__list',
        links: '.c-nav__link',
        active: 'is-active',
        expand: 'is-open'
    }

    const removeActiveLinks = () => {
        [...document.querySelectorAll(locators.links)].forEach(link => {
            removeActive(link)
        })
    }

    const renderActiveLink = elem => {
        const sibling = elem.nextElementSibling
        removeActiveLinks()
        collapseInactiveLinks(elem)
        addActive(elem)
        if (sibling && sibling.classList.contains(locators.menus) && !sibling.classList.contains(locators.expand)) {
            addExpand(elem)
        }
    }

    const onClickLink = ({ target }) => {
        if (!target.classList.contains(locators.active)) {
            renderActiveLink(target)
        }
    }

    const addActive = elem => {
        elem.classList.add(locators.active)
    }

    const removeActive = elem => {
        elem.classList.remove(locators.active)
    }

    const addExpand = elem => {
        elem.classList.add(locators.expand)
    }

    const removeExpand = elem => {
        elem.classList.remove(locators.expand)
    }

    const collapseInactiveLinks = elem => {
        const parent = elem
            .closest(`.${locators.menus}`)
        const expandedElements = parent ? parent.querySelectorAll(`.${locators.expand}`) : [];
        [...expandedElements].forEach(e => {
            removeExpand(e)
        })
    }

    const init = () => {
        [...document.querySelectorAll(locators.links)].forEach(link => {
            link.addEventListener('click', onClickLink)
        })
    }

    return init()
}

document.addEventListener('DOMContentLoaded', (event) => {
    resizeIframeHeightByContent()
    tabs()
    nav()
})
