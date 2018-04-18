import Vue from 'vue'
import * as types from './mutation-types'

export default {
	[types.UPDATE_BUILDING_SEL] (state, {building}) {
		Vue.set(state, 'building', building)
	}
}