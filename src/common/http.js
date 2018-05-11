import querystring from 'querystring'
import axios from 'axios'

import {bus} from './bus'

// var base_url = '/api/university/Interface.php'
// var base_url = '/local/university/Interface.php'

var base_url = '../api.action' //prod

var http = axios.create({
	url: base_url,
	timeout: 10000,
	transformRequest: [function (data) { 
		return querystring.stringify(data)
	}],
	transformResponse: [function (data) {
		return JSON.parse(data)
	}],
	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	validateStatus: function(status) {
		var connected = status >= 200 && status < 300
		if(!connected) {
			bus.$f7.addNotification({
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
		bus.$f7.showIndicator()
		return querystring.stringify(data)
	}],
	transformResponse: [function (data) {
		return JSON.parse(data)
	}],
	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	validateStatus: function(status) {
		bus.$f7.hideIndicator()
		var connected = status >= 200 && status < 300
		if(!connected) {
			bus.$f7.addNotification({
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
				bus.$f7.showIndicator()
			}
			var s = querystring.stringify(data)
			console.log(s)
			return s
		}],
		transformResponse: [function (data) {
			return JSON.parse(data)
		}],
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		validateStatus: function(status) {
			if(conf.indicator) {
				bus.$f7.hideIndicator()
			}
			var connected = status >= 200 && status < 300
			if(conf.notification) {
				if(!connected) {
					// bus.$f7.addNotification({
					// 	title: '网络错误',
					// 	subtitle: '网络请求失败,请检查您的网络'
					// })
				}
			}
			return connected
		}
	})
}

var fileUrl = '/file/'

function getFileHttp(c) {
	return axios.create({
		url: fileUrl,
		timeout: 10000,
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