import * as actions from './action'
import mutations from './mutations'

const state = {
	//用户信息数据
	user: {},
	//套餐选择数据
	serv: {},
	//信息填写数据
	info: {},
	//订单确认数据
	confirm: {}
}

export default {
	state,
	mutations,
	actions
}