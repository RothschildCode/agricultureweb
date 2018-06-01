import Vue from 'vue'

var eventbus = new Vue()

var EVENTS = {
	PULL_SCROLL_LOAD: 'PULL_SCROLL_LOAD', //滚动加载事件
	SUBNAV_ITEM_TAP: 'SUBNAV_ITEM_TAP',//二级导航点击事件
	MORE_OPERATION_TAP: 'MORE_OPERATION_TAP', //更多操作点击事件
	COMMENT_SUCC: 'COMMENT_SUCC',//评论成功事件
	SEL_BROW: 'SEL_BROW',//表情选择事件
	OPEN_COMM_POPUP: 'OPEN_COMM_POPUP'//打开回复popup事件
}

export {
	eventbus,
	EVENTS
}