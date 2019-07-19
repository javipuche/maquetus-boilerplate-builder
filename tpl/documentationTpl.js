const documentationTpl = (content, navigation, attributes) => `
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${attributes.pageTitle || 'Documentation'}</title>
        <link href="https://fonts.googleapis.com/css?family=Muli:200,300,400,600,700,800,900&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="/docs/css/documentation.css" />
    </head>
    <body>
        <div class="c-layout">
            ${navigation}

            <main class="c-layout__content">
                ${content}
            </main>
        </div>

        <script type="application/javascript">
            function resizeIframe(obj) {
                obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
            }
        </script>
    </body>
</html>
`

module.exports = documentationTpl
