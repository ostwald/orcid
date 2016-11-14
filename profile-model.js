var Profile = Class.extend({
    init: function (data) {
        this.data = data
        this.orcid_ID = data['orcid-identifier'].path
        this.family_name = data['orcid-bio']['personal-details']['family-name'].value
        this.given_names = data['orcid-bio']['personal-details']['given-names'].value
        this.activities = data['orcid-activities']
        if (!this.activities) {
            this.works = [];
            this.affilications = [];
        }
        else {
            this.works = this.activities['orcid-works'] ?
                         this.activities['orcid-works']['orcid-work'] : []
            this.affiliations = this.activities['affiliations'] ?
                             this.activities['affiliations']['affiliation'] : []
        }
    },

    status: function () {
        log ('orcid_id: ' + this.orcid_ID);
        log ('family name: ' + this.family_name);
        log ('given names: ' + this.given_names);

//        log ('activities');
//        for (var act_type in this.activities) {
//            var act_len = this.activities[act_type] && this.activities[act_type].length || 0;
//            log (' - ' + act_type + ' (' + act_len + ')');
//        }

        log ('affiliations');
        $(this.affiliations).each(function (i, affiliation) {
            try {
                log (' - ' + getContent(affiliation.organization.name));
            } catch (error) {
                log ('ERROR: ' + error)
            }
        });

        log ('works');
        $(this.works).each (function (i, work) {
            try {
               log (' - ' + work['work-title']['title'].value)
            } catch (error) {
                log (" - ERROR: " + error)
            }
        })
    }
});
