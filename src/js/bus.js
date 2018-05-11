import Vue from 'vue'

var eventbus = new Vue()

var EVENTS = {
	PULL_SCROLL_LOAD: 'PULL_SCROLL_LOAD', //滚动加载事件
	SUBNAV_ITEM_TAP: 'SUBNAV_ITEM_TAP',//二级导航点击事件
	MORE_OPERATION_TAP: 'MORE_OPERATION_TAP' //更多操作点击事件
}

export {
	eventbus,
	EVENTS
}