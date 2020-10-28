import React from 'react';
import SearchViewSetting from '../../../../config/searchViewSetting/index'

import qs from 'qs';
import util from '../../../../util/util';
import ApiConfig from '../../../../config/apiConfig';

const SearchMenu = (props) => {
    const tabList = SearchViewSetting.tablist[props.request.siteType]
    const tabList_kor = SearchViewSetting.tablist[props.request.siteType+"_kor"]

    const menu_cd = props.request.menu_cd || "all";

    const getCategorySearch = (menu_cd) => {
		if(props.request.m_site_cd === undefined) {
			alert('기관을 선택해주세요!!')
			return;
		}

		if(props.request.keyword !== undefined && props.request.keyword.replace(/[\\ ]/gi, '')) {
            props.request.menu_cd = menu_cd
            if(props.request.menu_cd === "doctor" || props.request.menu_cd === "department" || props.request.menu_cd === "professor") {
                props.request.size = 12
            } else {
                props.request.size = 3
            }

            if(props.request.menu_cd === "doctor") {
                props.request.cate_cd = "department"
            } else {
                props.request.cate_cd = ""
            }
			window.location.href = '/search/result?' + qs.stringify(util.searchKeywordSetting2(props.request))
		} else {
			alert("검색어를 입력해주세요!!")
			return;
		}
    }
    
    return (
        <nav className="tab-menu tab-menu-matrix tab-menu-search">
            <ul className="tab-list">
                {
                    tabList.map((data, index) => {
                        if(data === "link1" || data === "link2") {
                            return (
                                <li key={index}>
                                    <a href={ApiConfig[data] + props.request.keyword} target="_blank" rel="noopener noreferrer">
                                        <span>{tabList_kor[index]}<i className="ico ico-external-link ml-1"></i></span>
                                    </a>
                                </li>
                            )
                        } else {
                            return (
                                <li key={index} className={menu_cd === data ? "on" : ""}>
                                    <a href="#;" onClick={() => getCategorySearch(data)}>
                                        <span>{tabList_kor[index] + "(" + 
                                        ( data === "all" && props.result.totalSize !== undefined ? props.result.totalSize : // 통합검색
                                            props.result[data] !== undefined && props.result[data].totalSize !== undefined ? (
                                                data === "doctor" ? props.result["chosung"].totalSize : props.result[data].totalSize
                                            ) : 0 ) // 일반메뉴
                                            + ")"}</span>
                                    </a>
                                </li>
                            )
                        }
                    })
                }
            </ul>
        </nav>
    )
}

export default SearchMenu;