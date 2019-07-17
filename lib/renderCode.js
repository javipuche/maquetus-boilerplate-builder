const hljs = require('highlight.js')

const renderCode = (code, language = 'html') => {
    const renderedCode = hljs.highlight(language, code).value

    return `
        <div class="c-code">
            <pre><code class="${language}">${renderedCode}</code></pre>
        </div>
    `
}

module.exports = renderCode
