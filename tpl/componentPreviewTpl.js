const componentPreviewTpl = (html, styles, scripts) => `
    <!DOCTYPE html>
    <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Component Preview</title>
            ${styles}
        </head>
        <body style="margin:0; padding: 0.1px;">
            ${html}

            ${scripts}
        </body>
    </html>
`

module.exports = componentPreviewTpl
