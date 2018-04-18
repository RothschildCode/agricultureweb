import axios from 'axios'
import * as types from './mutation-types'
import * as Remote from '../remote-url'
import * as util from '../util'

let url = Remote.HTTPURL

export function loadBrandDirectionList({commit, state}, {keyword, callback}) {
	var ajaxParams = util.ajaxParams('BJ_PAD_ACTION_QUERY_QUERYTMLINFO')
	ajaxParams.param.tmlName = keyword
	axios.post(url, ajaxParams).then((res) => {
		callback(res.data.resultParam.tmlList)
	})
}

export function updateBrandDirectionSel({commit, state}, {data, callback}) {
	let route = state.route
	commit(types.UPDATE_BRAND_DIRECTION_SEL, {data})
	callback(route)
}

export function updateBrandDirectionRoute({commit}, {route, callback}) {
	commit(types.UPDATE_BRAND_DIRECTION_ROUTE, {route})
	callback(route)
}

// export function getBuildingRoute({state}, callback) {
// 	let route = state.route
// 	callback(route)
// }

export function getBrandDirectionData({commit, state}, callback) {
	var data = state.data
	// commit(types.UPDATE_BRAND_DIRECTION_SEL, {data: {}})
	callback(data)
}

export function clearBrandDirectionData({commit}) {
	commit(types.UPDATE_BRAND_DIRECTION_SEL, {data: {}})
}