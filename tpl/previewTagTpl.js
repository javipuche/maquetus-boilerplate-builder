const iframeComponentPreviewTpl = (url, hbsCode, html) => `
    <div class="c-tabs">
        <div class="c-tabs__nav">
            <button class="c-tabs__title">Result</button>
            <button class="c-tabs__title">HBS</button>
            <button class="c-tabs__title">HTML</button>
        </div>
        <div class="c-tabs__content">
            <iframe onload="resizeIframe(this)" src="${url}" frameborder="0" width="100%"></iframe>
        </div>
        <div class="c-tabs__content">
            ${hbsCode}
        </div>
        <div class="c-tabs__content">
            ${html}
        </div>
    </div>
`

module.exports = iframeComponentPreviewTpl
