import * as actions from './action'
import mutations from './mutations'

const state = {
	data: {
		areaVal: '',
		agencyVal: '',
		building: {},
		brandDirection: {}
	},
	route: null
}

export default {
	state,
	mutations,
	actions
}