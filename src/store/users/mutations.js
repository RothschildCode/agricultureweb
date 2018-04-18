import Vue from 'vue'
import * as types from './mutation-types'

export default {
	[types.UPDATE_USERS_SEL] (state, {user}) {
		Vue.set(state, 'user', user)
	}
}