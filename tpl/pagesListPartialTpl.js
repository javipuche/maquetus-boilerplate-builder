const indexPagesTpl = () => `
    {{#pagesListEq _this.type 'file'}}
            <li class="list__item">
                <a  class="list__link" href="{{ _this.url }}">{{ _this.link }}</a>
            </li>
        {{else}}
            <li class="list__item has-submenu">
                <div class="list__title"><strong>{{_this.name}}</strong></div>
                <ul class="list">
                    {{#if _this.children}}
                        {{#each _this.children}}
                            {{> pagesList _this=this}}
                        {{/each}}
                    {{else}}
                        <li class="list__item">
                            <a class="list__link" href="{{ _this.url }}">{{ _this.link }}</a>
                        </li>
                    {{/if}}
                </ul>
            </li>
    {{/pagesListEq}}
`

module.exports = indexPagesTpl
