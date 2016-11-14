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
               var work_obj = new Work(work)
            } catch (error) {
                log (" - ERROR: " + error)
            }
        })
    }
});

var Work = Class.extend( {
    init: function (data) {
        this.data = data;
        this.title = this.safe_get('work-title/title/value');
        this.doi = this.get_doi();
        this.journal = this.safe_get('journal-title/value')
        log ("DOI: " + this.doi)
        this.pub_year = this.safe_get('publication-date/year/value')
        this.pub_month = this.safe_get('publication-date/month/value')
        this.pub_day = this.safe_get('publication-date/day/value')
    },

    get_doi: function () {
        var ext_ids = this.safe_get('work-external-identifiers/work-external-identifier') || [];
        log (ext_ids.length + " ext ids found")
        for (var i=0;i<ext_ids.length;i++) {
            var ext_id = ext_ids[i];
            if (ext_id['work-external-identifier-type'] == 'DOI')
                return this.safe_get('work-external-identifier-id/value', ext_id);
        }
        return ''
    },

    safe_get: function (path, base) {
        base = base || this.data
        try {
            var obj = base;
            var splits = path.split('/');
            for (var i=0;i<splits.length;i++) {
                obj = obj[splits[i]];
            }
            return obj;
        } catch (error) {
            log ('safe_get error: ' + error);
            return '';
        }
    },

    render: function () {

        var pub_date = $t('div')
            .css ('float', 'right')
            .html(this.pub_year + "-" + this.pub_month)
        log (this.pub_year + "-" + this.pub_month + "-" + this.pub_day)

        return $t('li')
            .html(pub_date)
            .append(this.title + '!')
    }


})