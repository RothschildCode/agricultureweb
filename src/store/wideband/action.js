import * as types from './mutation-types'

export function updateWidebandUserData({commit}, {data, callback}) {
	commit(types.UPDATE_WIDEBAND_USER_DATA, {user: data})
	callback()
}
export function updateWidebandServData({commit}, {data, callback}) {
	commit(types.UPDATE_WIDEBAND_SERV_DATA, {serv: data})
	callback()
}
export function updateWidebandInfoData({commit}, {data, callback}) {
	commit(types.UPDATE_WIDEBAND_INFO_DATA, {info: data})
	callback()
}
