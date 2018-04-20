import http from '../../common/http'
import * as types from './mutation-types'
import * as util from '../util'

var img_url = 'http://peining.tunnel.echomod.cn/university/images/'

export function news_list({commit}) {
	http({
		data: {
			api: 'college_post_list',
			displayNumber: 15,
			pageIndex: 1,
			fid: 2
		},
		method: 'post'
	}).then((res) => {
		var list = res.data
		for(var i = 0; i < list.length; i++) {
			list[i].cover = img_url + 'img_14347674602997.jpg'
		}
		commit(types.UPDATE_LIST, {list})
	}).catch((err) => {
		alert(err)
	})
}

export function news_detail({commit}, {data}) {
	commit(types.UPDATE_DETAIL, {
		detail: data
	})
}