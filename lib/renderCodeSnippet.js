const hljs = require('highlight.js')

const renderCodeSnippet = (code, language) => {
    hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
    hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
    hljs.registerLanguage('js', require('highlight.js/lib/languages/javascript'))
    hljs.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'))
    hljs.registerLanguage('handlebars', require('highlight.js/lib/languages/handlebars'))
    hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
    hljs.registerLanguage('yaml', require('highlight.js/lib/languages/yaml'))
    hljs.registerLanguage('plaintext', require('highlight.js/lib/languages/plaintext'))

    language = language || 'handlebars'
    const renderedCode = hljs.highlight(language, code).value

    return `
        <div class="c-code">
            <pre><code class="${language}">${renderedCode}</code></pre>
        </div>
    `
}

module.exports = renderCodeSnippet
