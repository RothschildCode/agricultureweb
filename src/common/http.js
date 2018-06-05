import querystring from 'querystring'
import axios from 'axios'

import {eventbus} from '../js/bus'

var base_url = '/api/university/Interface.php'
// var base_url = '/local/university/Interface.php'
// var base_url = '../api.action' //prod

var http = axios.create({
	url: base_url,
	timeout: 10000,
	transformRequest: [function (data) { 
		data.uid = app.getUid()
		return querystring.stringify(data)
	}],
	transformResponse: [function (data) {
		return JSON.parse(data)
	}],
	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	validateStatus: function(status) {
		var connected = status >= 200 && status < 300
		if(!connected) {
			eventbus.$f7.addNotification({
				title: '网络错误',
				subtitle: '网络请求失败,请检查您的网络'
			})
		}
		return connected
	}
})

var http_indicator = axios.create({
	url: base_url,
	timeout: 10000,
	transformRequest: [function (data) {  
		eventbus.$f7.showIndicator()
		data.uid = app.getUid()
		return querystring.stringify(data)
	}],
	transformResponse: [function (data) {
		return JSON.parse(data)
	}],
	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	validateStatus: function(status) {
		eventbus.$f7.hideIndicator()
		var connected = status >= 200 && status < 300
		if(!connected) {
			eventbus.$f7.addNotification({
				title: '网络错误',
				subtitle: '网络请求失败,请检查您的网络'
			})
		}
		return connected
	}
})

let http_conf = {
	indicator: false,
	notification: true
}

function gethttp(c) {
	var conf = Object.assign(http_conf, c)
	return axios.create({
		url: base_url,
		timeout: 10000,
		transformRequest: [function (data) {  
			if(conf.indicator) {
				eventbus.$f7.showIndicator()
			}
			data.uid = app.getUid()
			return querystring.stringify(data)
		}],
		transformResponse: [function (data) {
			return JSON.parse(data)
		}],
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		validateStatus: function(status) {
			if(conf.indicator) {
				eventbus.$f7.hideIndicator()
			}
			var connected = status >= 200 && status < 300
			if(conf.notification) {
				if(!connected) {
					// eventbus.$f7.addNotification({
					// 	title: '网络错误',
					// 	subtitle: '网络请求失败,请检查您的网络'
					// })
				}
			}
			return connected
		}
	})
}

// var fileUrl = '/file/'
var fileUrl = '../file.action' // prod
var target = 'http://127.0.0.1:9999'

function getFileHttp(c) {
	return axios.create({
		url: fileUrl,
		timeout: 10000,
		transformRequest: [function (data) { 
			data.target = target
			return querystring.stringify(data)
		}],
		transformResponse: [function (data) {
			return JSON.parse(data).RETURN
		}],
		// headers: {'Content-Type': 'application/json'}
	})
}

export {
	http_indicator, 
	http,
	gethttp,
	getFileHttp
}