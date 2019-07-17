const indexPagesTpl = () => `
    <!DOCTYPE html>
    <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Pages List</title>
            <style media="screen">
                body {
                    marign: 0;
                    font-family: sans-serif;
                    background-color: #f5f5f5;
                }

                h4 {
                    margin-top: 40px;
                }

                .container {
                    max-width: 1200px;
                    margin: 40px auto;
                    width: 100%;
                }

                .list {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    grid-column-gap: 16px;
                    grid-row-gap: 24px;
                }

                .list__title {
                    grid-column: 1/-1;
                    padding-top: 8px;
                    padding-bottom: 24px;
                    text-transform: uppercase;
                }

                .list__link {
                    text-decoration: none;
                    color: #333;
                }

                .list__link:hover {
                    color: green;
                }

                .list__item.has-submenu {
                    grid-column: 1/-1;
                    padding: 24px;
                }

                .list__item.has-submenu .list__item.has-submenu {
                    padding: 0;
                }

                .list__item.has-submenu .list__item.has-submenu .list__title {
                    font-size: 14px;
                    padding-top: 32px;
                    border-top: 1px solid #e3e2e2;
                    margin-top: 16px;
                }

                .list.first > .list__item {
                    background-color: #fff;
                    padding: 16px;
                }

                .list.first > .list__item.has-submenu {
                    padding: 24px;
                }

                .first > .has-submenu {
                    background-color: #fff;
                    border-width: 1px;
                    border-color: transparent;
                    border-style: solid;
                    transition: all .3s;
                }

                .first > .has-submenu:hover {
                    border-color: green;
                }
            </style>
        </head>
        <body>
            <section class="container">
                <ul class="list first">
                    <li class="list__item">
                        <a class="list__link" href="/docs">Documentación</a>
                    </li>
                </ul>
                <h4>Páginas</h4>
                <ul class="list first">
                    {{#if links}}
                        {{#each links}}
                            {{> pagesList _this=this}}
                        {{/each}}
                    {{else}}
                        <p>Crea una página.</p>
                    {{/if}}
                </ul>
            </section>
        </body>
    </html>
`

module.exports = indexPagesTpl
