import {v, EVENTS} from '../core/vbus'

var appUtil = {
	getCache: (k) => {
		var jdata = localStorage.getItem(k)
		if(!jdata) {
			return null
		}
		var odata = JSON.parse(jdata)
		if(odata.needParse) {
			return JSON.parse(odata.data)
		}
		return odata.data
	},
	putCache: (k, v) => {
		var data = {
			needParse: false
		}
		if(v instanceof String) {
			data.data = v
		}else {
			data.needParse = true
			data.data = JSON.stringify(v)
		}
		localStorage.setItem(k, JSON.stringify(data))
	},
	isLogin() {
		var isLogin = true
		var uid = this.getUid()
		if(uid == '') {
			this.applyNativeMethod('goLogin')
			isLogin = false
		}
		return isLogin
	},
	getUid() {
		if(window.thirdtools&&window.thirdtools.getUid) {
			var uid = window.thirdtools.getUid()
			if(uid && uid != '') {
				return uid
			}
			return ''
		}
		return ''
	},
	getArea() {
		if(window.thirdtools&&window.thirdtools.getArea) {
			var area = window.thirdtools.getArea()
			if(area && area != '') {
				return area
			}
			return ''
		}
		return ''
	},
	loginedInfo(callback) {
		if(this.isLogin()) {
			callback({
				uid: this.getUid(),
				area: this.getArea()
			})
		}
	},
	openCommPopup(data) {
		if(!this.isLogin()) return
		v.$emit(EVENTS.OPEN_COMM_POPUP, data)
	},
	applyNativeMethod(method, func) {
		func = func || function() {}
		if(window.thirdtools && window.thirdtools[method]) {
			window.thirdtools[method]()
		}else {
			func()
		}
	}
}

export default appUtil