import Vue from 'vue'
import * as types from './mutation-types'

export default {
	[types.UPDATE_BRAND_DIRECTION_SEL] (state, {data}) {
		Vue.set(state, 'data', data)
	},
	[types.UPDATE_BRAND_DIRECTION_ROUTE] (state, {route}) {
		Vue.set(state, 'route', route)
	}
}