import axios from 'axios'
import * as types from './mutation-types'
import * as Remote from '../remote-url'
import * as util from '../util'

let url = Remote.HTTPURL

export function getUserInfoConfig({commit, state}, callback) {
	var data = state.data
	commit(types.UPDATE_USER_INFO_CONFIG, {data: {}})
	callback(data)
}

export function updateUserInfoConfig({commit, state}, {data, callback = () => {}}) {
	let route = state.route
	commit(types.UPDATE_USER_INFO_CONFIG, {data})
	callback(route)
}

export function updateUserInfoConfigRoute({commit}, {route}) {
	commit(types.UPDATE_USER_INFO_ROUTE, {route})
}

export function getUserInfoConfigRoute({state}, callback) {
	let route = state.route
	callback(route)
}

export function getUserInfoConfigAreas({commit}, callback) {
	axios.post(url, util.ajaxParams('BJ_PAD_ACTION_QUERY_INITPARAM')).then((res) => {
		callback(res.data.resultParam.initParamList)
	})
}

export function getUserInfoConfigAgency({commit}, callback) {
	axios.post(url, util.ajaxParams('BJ_PAD_ACTION_QUERY_INITPARAM')).then((res) => {
		callback(res.data.resultParam.initParamList)
	})
}