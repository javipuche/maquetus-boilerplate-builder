const componentPreviewTpl = (html, path) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <link rel="stylesheet" href="/assets/css/styles.css" />
        </head>
        <body style="margin:0;">
            ${html}
        </body>
    </html>
`

module.exports = componentPreviewTpl
