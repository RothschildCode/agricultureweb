import Vue from 'vue'
import * as types from './mutation-types'

export default {
	[types.UPDATE_BUILDING_SEL] (state, {data}) {
		Vue.set(state, 'data', data)
	},
	[types.UPDATE_BUILDING_ROUTE] (state, {route}) {
		Vue.set(state, 'route', route)
	}
}