const previewTagTpl = (url, hbsCode, html, title) => `
    <div class="c-tabs">
        <div class="c-tabs__box">
            ${title ? '<div class="c-tabs__title">' + title + '</div>' : ''}
        </div>
        <div class="c-tabs__nav">
            <button class="c-tabs__item is-active" data-tabs-btn="result" data-tabs-id="docs-${title}">Result</button>
            <button class="c-tabs__item" data-tabs-btn="hbs" data-tabs-id="docs-${title}">HBS</button>
            <button class="c-tabs__item" data-tabs-btn="html" data-tabs-id="docs-${title}">HTML</button>
            <div class="c-tabs__actions">
                <a href="${url}" class="c-tabs__action" target="_blank"><span class="fas fa-external-link-alt"></span></a>
            </div>
        </div>
        <div class="c-tabs__content is-active" data-tabs-content="result" data-tabs-id="docs-${title}">
            <iframe onload="resizeIframe(this)" src="${url}" frameborder="0" width="100%"></iframe>
        </div>
        <div class="c-tabs__content" data-tabs-content="hbs" data-tabs-id="docs-${title}">
            ${hbsCode}
        </div>
        <div class="c-tabs__content" data-tabs-content="html" data-tabs-id="docs-${title}">
            ${html}
        </div>
    </div>
`

module.exports = previewTagTpl
