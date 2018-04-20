import Vue from 'vue'
import * as types from './mutation-types'

export default {
	[types.UPDATE_LIST] (state, {list}) {
		Vue.set(state, 'list', list)
	},
	[types.UPDATE_DETAIL] (state, {detail}) {
		Vue.set(state, 'detail', detail)
	}
}