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
            <div id="nav" class="c-layout__nav">
                ${navigation}
            </div>
            <main id="content" class="c-layout__content s-cms">
                ${content}
            </main>
        </div>

        <script src="https://kit.fontawesome.com/7256df49cf.js"></script>
        <script src="/docs/js/documentation.js" charset="utf-8" defer></script>
    </body>
</html>
`

module.exports = documentationTpl
