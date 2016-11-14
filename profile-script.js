var PROFILE = null;

// Config
var CLIENT = DEFAULT_CLIENT;
var SERVICE = DEFAULT_SERVICE;

$(function () {

    if (PARAMS.orcid)
        log ("using orcid in url");
    var ORCID_ID = PARAMS.orcid || CLIENT.ORCID_ID


    var base_uri = SERVICE.BASE_API_URL + '/' + ORCID_ID + '/orcid-profile';
    var params = {
        client_id : CLIENT.CLIENT_ID,
        client_secret : CLIENT.CLIENT_SECRET,
    }

    function display_profile_response (response_json) {
        try {
            PROFILE = new Profile(response_json['orcid-profile']);
        } catch (error) {
            log ("PROFILE error: " + error);
        }
        PROFILE.status()
        $('#orcid-id').html(PROFILE.orcid_ID);
        $('#family-name').html(PROFILE.family_name);
        $('#given-names').html(PROFILE.given_names);

        log ('affiliations ' + PROFILE.affiliations.length);
        $(PROFILE.affiliations).each (function (i, aff) {
            // log ("aff: " + stringify(aff))
            if (aff.type == 'EMPLOYMENT')
                log (' - ' + getContent(aff.organization.name));
            else if (aff.type == 'EDUCATION') {
                log (' - ' + getContent(aff.organization.name));
            }
            $('#affiliations').append($t('li').html(getContent(aff.organization.name + ' (' + aff.type + ')')))
        });

        $(PROFILE.works).each (function (i, work) {
            var work_obj = new Work (work);
            $('#works').append(work_obj.render());

            log (stringify(work))
        });

        // $('#response-json').html($t('pre').html(stringify(response_json)));
    }


    $.ajax ({
            url:base_uri + '?' + $.param(params),
            headers : {
                'Accept' : 'application/vnd.orcid+xml',
                'Authorization' : 'Bearer'
            },
            dataType : "jsonp",
            success: function (responseJson) {
                // log ("RESPONSE: " + stringify(responseJson));
                display_profile_response (responseJson)
            }
    });

});