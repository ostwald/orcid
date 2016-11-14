

//var scope = '/authenticate';

var PARAMS;
// Config
var CLIENT = CONFIGS.sandbox_member_tmp;
var SERVICE = CONFIGS.sandbox_service;
var REDIRECT_URI = CONFIGS.redirect_uri;
var SCOPE = '/orcid-works/create';
var ACCESS_TOKEN = null;
var key = 'orcid_client_credentials'
function getCredentials() {
    credentials = local
}

if (typeof(Storage) !== "undefined") {
    try {
        var credentials = fetch_stored_json (key);
        if (credentials)
            ACCESS_TOKEN = credentials.access_token;
    } catch (error) {
        log ("could not get access_token: " + error)
        ACCESS_TOKEN = null;
    }
}

$(function () {

    log (window.location.search)
	PARAMS = $.parseParams(location.search);
	var error = PARAMS.error;
	var code = PARAMS.code;
	if (error) {
		if (error == 'access_denied') {
			alert ("you have denied access");
		}
	}
    else if (code) {
        log ("code is " + code);
        // getToken(code)
        // make auth url and redirect
    }
	else if (!ACCESS_TOKEN) {
		log ("authenticating ...");
        getCode(SCOPE);

	}
    else {
        log ('ACCESS-TOKEN: ' + ACCESS_TOKEN)
    }

})

function getCode (scope) {
    var auth_params = {
        client_id : CLIENT.CLIENT_ID,
        response_type : 'code',
        scope : scope,
        redirect_uri : REDIRECT_URI
    }
    var auth_uri = SERVICE.AUTHORIZE_URL + '?' + $.param(auth_params);
    log ("auth_uri: " + auth_uri);
    window.location = auth_uri;
}

function getToken(code) {
    var params = {
        client_id : CLIENT.CLIENT_ID,
        client_secret : CLIENT.CLIENT_SECRET,
        grant_type : 'authorization_code',
        redirect_uri : REDIRECT_URI,
        code : code,
    }

    function callback (responseJson) {
        log ("get TOKEN CALLBACK: " + stringify(responseJson));
        // response should include access_token, orcid_ID, ...
        store_json (key, responseJson)

    }

    log ("PARAMS");
    log (stringify(params));

    $.ajax ({
            // url:base_uri + '?' + $.param(params),
            url: SERVICE.TOKEN_URL,
            data : $.param(params),
//				data : params,
//                method : 'POST',
            jsonpCallback : 'callback',
            headers : {
                'Accept' : 'application/json'
            },
            dataType : "jsonp",
            success: function (responseData) {
                log ("RESPONSE: " + stringify(responseData));
                callback(responseData)
            },
            // error: function (jzXHR, textsStatus, errorThrown) {
            // 	log ("AJAX ERROR: " + textStatus);
            // }
    });
}