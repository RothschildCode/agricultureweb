import Vue from 'vue'
import * as types from './mutation-types'

export default {
	[types.UPDATE_WIDEBAND_USER_DATA] (state, {user}) {
		Vue.set(state, 'user', user)
	},
	[types.UPDATE_WIDEBAND_SERV_DATA] (state, {serv}) {
		Vue.set(state, 'serv', serv)
	},
	[types.UPDATE_WIDEBAND_INFO_DATA] (state, {info}) {
		Vue.set(state, 'info', info)
	}
}