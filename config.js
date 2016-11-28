CONFIGS = {


    redirect_uri : 'http://localhost/orcid/handshake.html',

    sandbox_public : {
        name : 'sandbox_public',
        CLIENT_ID : 'https://sandbox.orcid.org/oauth/authorize',
        CLIENT_SECRET : 'f44c5b94-3e88-445c-9664-d3bd080f48ed'
    },

    public : {
        name : 'public',
        CLIENT_ID : 'APP-QI6Q1PYLJCZI9INC',
        CLIENT_SECRET : 'ecc1bd0d-f77b-49e3-8754-4fa4b4290db6',
        REDIRECT_URI : "http://localhost/orcid"
    },

    sandbox_member_tmp : {
        name : 'sandbox_member_tmp',
        CLIENT_ID: 'APP-E422WM33OPZWKKMQ',
        CLIENT_SECRET: 'ae857cfb-446b-4c3f-8a09-55436bf602dc',
    },

    sandbox_member : {
        name : 'sandbox_member',
        CLIENT_ID: 'APP-ME9Y2F05R0S03YKU',
        CLIENT_SECRET: '7453431a-3cf9-4e2d-802a-71a40e781fa0',
    },

    // SERVICE endpoints

    sandbox_public_service : {
        name : 'sandbox_public_service',
        BASE_API_URL : 'https://pub.sandbox.orcid.org/v1.2',
        TOKEN_URL : 'https://sandbox.orcid.org/oauth/token',
        AUTHORIZE_URL : 'https://sandbox.orcid.org/oauth/authorize',
        SEARCH_API : 'https://pub.sandbox.orcid.org'
    },

    sandbox_member_service : {
        name : 'sandbox_member_service',
        BASE_API_URL : 'https://api.sandbox.orcid.org/v1.2',
        TOKEN_URL : 'https://sandbox.orcid.org/oauth/token',
        AUTHORIZE_URL : 'https://sandbox.orcid.org/oauth/authorize',
        SEARCH_API : 'https://api.sandbox.orcid.org'
    },

    orcid_public_service : {
        BASE_API_URL : 'https://api.orcid.org/v1.2',
        name : 'orcid_public_service',
        TOKEN_URL : 'https://orcid.org/oauth/token',
        AUTHORIZE_URL : 'https://orcid.org/oauth/authorize',
        SEARCH_API : 'https://pub.orcid.org'
    },

    orcid_member_service : {
        BASE_API_URL : 'https://api.orcid.org/v1.2',
        name : 'orcid_member_service',
        TOKEN_URL : 'https://orcid.org/oauth/token',
        AUTHORIZE_URL : 'https://orcid.org/oauth/authorize',
        SEARCH_API : 'https://api.orcid.org'
    }
}

var DEFAULT_CLIENT = CONFIGS.sandbox_public
var DEFAULT_SERVICE =  CONFIGS.sandbox_public_service

//var DEFAULT_CLIENT = CONFIGS.public
//var DEFAULT_SERVICE =  CONFIGS.orcid_public_service