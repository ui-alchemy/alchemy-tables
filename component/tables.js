var Tables = (function($){
    var settings = {},
        template = ' \
            <table class="table {{ classes }}"> \
              <thead class="table-head"> \
                <tr> \
                  {{#each row_headers}} \
                    <th>{{ this }}</th> \
                  {{/each}} \
                </tr> \
              </thead> \
              <tbody class="table-body"> \
                {{#each rows}} \
                  <tr> \
                    {{#each this}} \
                      <td>{{ this }}</td> \
                    {{/each}} \
                  </tr> \
                {{/each}} \
              </tbody> \
            </table>';

    var init = function(config){
            settings = config;
            template = config['template'] ? config['template'] : template;

            return this;
        },
        render = function(data, target){
            var content = Handlebars.compile(template);
            
            data = $.extend(true, {}, data, settings);

            target.append(content(data));
            return this;
        };

    return {
        render  : render,
        init    : init
    };

})(jQuery);
