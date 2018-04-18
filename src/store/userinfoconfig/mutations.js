import Vue from 'vue'
import * as types from './mutation-types'

export default {
	[types.UPDATE_USER_INFO_CONFIG] (state, {data}) {
		Vue.set(state, 'data', data)
	},
	[types.UPDATE_USER_INFO_ROUTE] (state, {route}) {
		Vue.set(state, 'route', route)
	}
}