import axios from 'axios'
import * as types from './mutation-types'
import * as Remote from '../remote-url'
import * as util from '../util'

let url = Remote.HTTPURL

export function loadUserList({commit}, {condition, callback}) {
	var ajaxParam = util.ajaxParams('BJ_PAD_ACTION_QUERY_CUST')
	ajaxParam.param.identifyType = condition.identifyType
	ajaxParam.param.value = condition.value
	ajaxParam.param.selType = condition.selType

	axios.post(url, ajaxParam).then((res) => {
		callback(res.data.resultParam.custList)
	})
}

export function updateUsersSel({commit}, {user, callback}) {
	commit(types.UPDATE_USERS_SEL, {user})
	callback(user)
}

export function getUsersSel({commit, state}, {callback}) {
	var user = state.userSel
	commit(types.UPDATE_USERS_SEL, {user: {}})
	callback(user)
}