$(function(){
    var data = {
            row_headers : ['Column 1', 'Column 2', 'Column 3'],
            rows        : [
                ['1', '2', '3'],
                ['4', '5', '6']
            ]
        };

    var table = Tables.render(data);

    $('.maincontent').append(table);
});

var Tables = (function($){
    var template = ' \
            <table> \
              <thead> \
                <tr> \
                  {{#each row_headers}} \
                    <th>{{ this }}</th> \
                  {{/each}} \
                </tr> \
              </thead> \
              <tbody> \
                {{#each rows}} \
                  <tr> \
                    {{#each this}} \
                      <td>{{ this }}</td> \
                    {{/each}} \
                  </tr> \
                {{/each}} \
              </tbody> \
            </table>';

    var render = function(data){
        var content = Handlebars.compile(template);
        
        return content(data);
    };

    return {
        render : render
    };

})(jQuery);
