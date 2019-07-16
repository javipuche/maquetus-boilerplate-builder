const iframeComponentPreviewTpl = (url) => `
    <iframe onload="resizeIframe(this)" src="/${url}.html" frameborder="0" width="100%"></iframe>
`

module.exports = iframeComponentPreviewTpl
