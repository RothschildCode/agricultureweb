import axios from 'axios'
import * as types from './mutation-types'
import * as Remote from '../remote-url'
import * as util from '../util'

let url = Remote.HTTPURL

export function loadBuildingList({commit, state}, {keyword, callback}) {
	var ajaxParams = util.ajaxParams('BJ_PAD_ACTION_QUERY_QRYBUILDINGSBYNAME')
	ajaxParams.param.name = keyword
	axios.post(url, ajaxParams).then((res) => {
		callback(res.data.resultParam.buildingList)
	})
}

export function updateBuildingSel({commit, state}, {data, callback}) {
	let route = state.route
	commit(types.UPDATE_BUILDING_SEL, {data})
	callback(route)
}

export function updateBuildingRoute({commit}, {route, callback}) {
	commit(types.UPDATE_BUILDING_ROUTE, {route})
	callback(route)
}

// export function getBuildingRoute({state}, callback) {
// 	let route = state.route
// 	callback(route)
// }

export function getBuildingData({commit, state}, callback) {
	var building = state.data
	// commit(types.UPDATE_BUILDING_SEL, {data: {}})
	callback(building)
}

export function clearBuildingData({commit}) {
	commit(types.UPDATE_BUILDING_SEL, {data: {}})
}