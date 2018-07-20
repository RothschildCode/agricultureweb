import querystring from 'querystring'
import axios from 'axios'

import {v, EVENTS} from './vbus'

var DEV_MODE = 'prod'

var httpUrl = {
	dev	: 'http://127.0.0.1:9000/agricultureweb/api.action',
	test: 'http://39.107.99.122:8080/agricultureweb/api.action',
	prod: 'http://120.193.187.3:5080/agricultureweb/api.action'
}

var base_url = httpUrl[DEV_MODE]

var http = axios.create({
	url: base_url,
	timeout: 60000,
	transformRequest: [function (data) {
		return querystring.stringify(data)
	}],
	headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})

var fileHttpUrl = {
	test: 'http://39.107.99.122:8080/agricultureweb/file.action',
	prod: 'http://120.193.187.3:5080/agricultureweb/file.action'
}

var fileUrl = fileHttpUrl[DEV_MODE]
function getFileHttp(c) {
	return axios.create({
		url: fileUrl,
		timeout: 10000,
		transformRequest: [function (data) {
			// data.target = target
			return querystring.stringify(data)
		}],
		transformResponse: [function (data) {
			return JSON.parse(data).RETURN
		}]
	})
}

function $ajax(options, succCallback, errCallback) {
	options = options || {}
	succCallback = succCallback || function(res) {
		console.log(res)
	}
	errCallback = errCallback || function(err) {}
	var errorMsg = options.errorMsg || '系统错误'
	var postData = options.data
	var pageRefresh = options.pageRefresh == true
	var showLoading = options.showLoading == true
	if(showLoading) { v.$f7.showIndicator() }
	http({
		data: postData,
		method: 'POST'
	}).then((res) => {
		if(showLoading) { v.$f7.hideIndicator() }
		if(res.status != 200) {
			if(pageRefresh) {
				v.$emit(EVENTS.NETWORK_ERROR, '当前网络不给力:(，故障码：' + res.status)
			} else {
			    v.$f7.addNotification({
			        title: '网络故障',
			        message: '无法从服务器获取数据'
			    })
			}
		    return
		}
		var respData = res.data
		if(respData.s != 0) {
			// v.$f7.modal({
			// 	title: errorMsg,
			// 	buttons: [{
			// 		text: '关闭'
			// 	}]
			// })
			return
		}
		succCallback(respData.data)
	}).catch((err) => {
		// v.$f7.addNotification({
	 //        title: '系统异常',
	 //        message: err.message
	 //    })
	 	if(showLoading) { v.$f7.hideIndicator() }
	 	if(pageRefresh) {
		 	var label = ''
		 	if(err.message == 'Network Error') {
		 		label = '网络不给力'
		 	}else {
		 		label = '糟糕，系统出现了故障'
		 	}
		 	v.$emit(EVENTS.NETWORK_ERROR, label)	 		
	 	}
		errCallback(err)	 	
	    console.error(err.stack)
	})
}

export {
	$ajax,
	getFileHttp
}