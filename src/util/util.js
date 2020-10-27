let util = {
    isEmpty: (v) => {
        if (v === "" || v === undefined || v === null) {
          return true;
        } else {
          return false;
        }
    },
    viewKeywordSetting: (request) => {
        let must = "";
        let mustNot = "";
        let should = "";
        let keyword = request.keyword || "";

        keyword.split(' ').forEach(d => {
            if(d.indexOf('+') === 0) {
                must += " " + d.replace('+','');
            } else if(d.indexOf('-') === 0) {
                mustNot += " " + d.replace('-','');
            } else if(d.indexOf('|') === 0) {
                should += " " + d.replace('|','');
            }
        });

        const result = {
            ...request,
            keyword: keyword.trim(),
            must: must.trim(),
            mustNot: mustNot.trim(),
            should: should.trim()
        }

        return result;
    },
    searchKeywordSetting: (request) => {
        const keyword = request.keyword || "";
        const afterMust = request.must || "";
        const afterMustNot = request.mustNot || "";
        const afterShould = request.should || "";

        let afterKeyword = "";

        let onlyKeyword = "";

        keyword.split(' ').forEach(d => {
            if(d.indexOf('+') !== 0 && d.indexOf('-') !== 0 && d.indexOf('|') !== 0) {
                onlyKeyword += " " + d.trim();
            }
        })

        afterKeyword += onlyKeyword;

        afterMust.split(' ').forEach(d => {
            if(d !== undefined && d.length > 0) {
                afterKeyword += " +" + d
            }
        })
        afterMustNot.split(' ').forEach(d => {
            if(d !== undefined && d.length > 0) {
                afterKeyword += " -" + d
            }
        })
        afterShould.split(' ').forEach(d => {
            if(d !== undefined && d.length > 0) {
                afterKeyword += " |" + d
            }
        })
        
        const result = {
            ...request,
            keyword: afterKeyword.trim(),
            must: afterMust.trim(),
            mustNot: afterMustNot.trim(),
            should: afterShould.trim()
        }

        return result
    },
    searchKeywordSetting2: (request) => {
        const keyword = request.keyword || "";
        let must = ""
        let should = ""
        let mustNot = ""

        keyword.split(' ').forEach(d => {
            if(d.indexOf('+') === 0) {
                must += " " + d.substring(1, d.length)
            } else if(d.indexOf('-') === 0) {
                mustNot += " " + d.substring(1, d.length)
            } else if(d.indexOf('|') === 0) {
                should += " " + d.substring(1, d.length)
            }
        })

        if(request.menu_cd === "doctor" || request.menu_cd === "department" || request.menu_cd === "professor") {
            return {
                keyword: request.keyword.trim(),
                must: must.trim(),
                should: should.trim(),
                mustNot: mustNot.trim(),
                m_site_cd: request.m_site_cd,
                s_site_cd: request.s_site_cd,
                menu_cd: request.menu_cd,
                siteType: request.siteType,
                size: request.size,
                cate_cd: request.cate_cd
            }
        } else {
            return {
                keyword: request.keyword.trim(),
                must: must.trim(),
                should: should.trim(),
                mustNot: mustNot.trim(),
                m_site_cd: request.m_site_cd,
                s_site_cd: request.s_site_cd,
                menu_cd: request.menu_cd,
                siteType: request.siteType,
                size: request.size
            }
        }

    },
    clearKeywordSetting: (keyword) => {
        let clearKeyword = "";

        keyword.split(' ').forEach(data => {
            if(data.indexOf('+') !== 0 && data.indexOf('-') !== 0 && data.indexOf('|') !== 0) {
                clearKeyword += data.trim() + " ";
            }
        })

        return clearKeyword;
    },
    onlyKeywordSetting: (request, keyword) => {
        const reSearchKeyword = request.reSearchKeyword || "";
        let searchKeyword = keyword
        if(reSearchKeyword.length > 0) {
            searchKeyword = keyword + " +" + reSearchKeyword
        }

        if(request.menu_cd === "doctor" || request.menu_cd === "department" || request.menu_cd === "professor") {
            return {
                keyword: searchKeyword.trim(),
                m_site_cd: request.m_site_cd,
                s_site_cd: request.s_site_cd,
                menu_cd: request.menu_cd,
                siteType: request.siteType,
                size: request.size,
                cate_cd: request.cate_cd
            }
        } else {
            return {
                keyword: searchKeyword.trim(),
                m_site_cd: request.m_site_cd,
                s_site_cd: request.s_site_cd,
                menu_cd: request.menu_cd,
                siteType: request.siteType,
                size: request.size
            }
        }
    },
    m_site_cdType: (m_site_cd) => {
        switch (m_site_cd) {
            case "yuhs": 
                return "headquarter"
            case "sev": 
                return "hospital"
            case "gs": 
                return "hospital"
            case "cancer": 
                return "hospital"
            case "dental": 
                return "hospital"
            case "yi": 
                return "hospital"
            case "medicine": 
                return "school"
            case "dentistry": 
                return "school"
            case "nursing": 
                return "school"
            case "gsph": 
                return "school"
            default: 
                return "hospital"
        }
    }
}

export default util;