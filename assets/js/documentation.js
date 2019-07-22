const resizeIframe = (obj) => {
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px'
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
            console.log(el)
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

document.addEventListener('DOMContentLoaded', (event) => {
    resizeIframeHeightByContent()
    tabs()
})
