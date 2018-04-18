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

export function updateBuildingSel({commit}, {user, callback}) {
	commit(types.UPDATE_USERS_SEL, {user})
	callback(user)
}

export function getBuildingData({commit, state}, callback) {
	var building = state.building
	commit(types.UPDATE_BUILDING_SEL, {building: {}})
	callback(building)
}