// Config
var CLIENT = DEFAULT_CLIENT;
var SERVICE = DEFAULT_SERVICE;
var base_uri = SERVICE.SEARCH_API + '/search/orcid-bio';

log ("CLIENT: " + CLIENT.name)
log ("SERVICE: " + SERVICE.name)

$(function () {
    // debugging
    $('#query').val('newman');

    render_fields();


    log ("RUNNING");
    // searchProxy(base_uri, params);

    $('#search-button')
        .button()
        .click (function (event) {
            doSearch()
        });

    $('#search-form').submit (function (event) {

        log ('submit');
        event.preventDefault();
    });

});

function doSearch() {
    log ("doSearch")
    var params = {
        client_id : CLIENT.CLIENT_ID,
        client_secret : CLIENT.CLIENT_SECRET,
        q: 'newman',
        start: '0',
        rows: '100'
    }

//    var field = 'family-name';
    var field = $('input[name=field-name]:checked' , $('#search-form')).val()
    log ("checked field is: " + field)
    if (field in field_aliases) {
        field = field_aliases[field]
    }
    params.q = field + ':' + $('#query').val();
    log ("q: " + params.q);
    searchProxy(base_uri, params);
}

function display_search_results (response_json) {
    var num_found = response_json['orcid-search-results']['num-found']
    var results = response_json['orcid-search-results']['orcid-search-result'];
    log (" - " + results.length + " to display");
    $('#results-body').html('');
    $(results).each (function (i, result) {
        try {
            if (false && i == 0)
                log (stringify(result));
            var profile = new Profile(result['orcid-profile']);
            var profile_link = $t('a')
                .attr('href', 'profile.jsp?orcid=' + profile.orcid_ID)
                .html(profile.orcid_ID);

            var row = $t('tr').attr('id', profile.orcid_ID)
                .append($t('td').html(profile.family_name))
                .append($t('td').html(profile.given_names))
                // .append($t('td').html(profile.orcid_ID))
                .append($t('td').html(profile_link))

            $('#results-body').append(row);

        } catch (error) {
            log ("PROFILE error: " + error);
        }
    })
}

function searchProxy(base_url, params) {

    $.ajax ({
        url:base_url + '?' + $.param(params),
        headers : {
            'Accept' : 'application/vnd.orcid+xml',
            'Authorization' : 'Bearer'
        },
        dataType : "jsonp",
        success: function (responseJson) {
//            log ("RESPONSE: " + stringify(responseJson));

            var num_found = responseJson['orcid-search-results']['num-found']
            $('#results-header').html ('Results (' + num_found + ')');

            display_search_results (responseJson)
        },
        fail: function (response) {
            log ('FAILURE: ' + stringify(response))
        }
    });

}

var field_names = [
    'text',
    'family-name',
    // 'keywords' // doesn't appear to work
    'doi',
    'email'
]

var field_aliases = {
    'doi' : 'digital-object-ids'
}

function render_fields (selected) {

    var selected = selected || 'text'
    var $widget_dom = $('#fields-widget');

    $(field_names).each(function (i, field_name) {
        $widget_dom
            .append($('<input>')
                .attr('type','radio')
                .attr('id', 'cb_' + i)
                .attr('name', 'field-name')
                .prop('checked', field_name == selected)
                //.val(solr_field))
                .val(field_name))
            .append($('<label>')
                .attr('for', 'cb_' + i)
                .html(field_name))
    });

    $widget_dom
        .buttonset()
        .change(function (event) {
            // doSearch);
            log ("IM CLICKED!")
            doSearch()
        })

}