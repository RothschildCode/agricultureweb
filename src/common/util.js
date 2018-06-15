import jQuery from 'jquery'
import {brows} from './browsMap'
import {eventbus, EVENTS} from '../js/bus'

Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};

(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    window.$ = jQuery
    $.parseRichText = function(text) {
    	var t  = text
    	for(var i = 0; i < brows.length; i++) {
    		var k = '（#' + brows[i].name + '）'
    		var s = '<svg aria-hidden="true" class="emoj"><use xlink:href="' + brows[i].link + '"></use></svg>'
    		t = t.replace(new RegExp(k,'g'), s)
    	}
    	return t
    }
    $.setData = function(k, v) {
    	var data = {
    		isobject: false
    	}
    	if(!v instanceof String) {
    		v = JSON.stringify(v)
    		data.isobject = true
    	}
    	data.data = v
    	window.localStorage.setItem(k, JSON.stringify(data))
    }
    $.getData = function(k) {
    	var j = window.localStorage.getItem(k)
    	if(j && j != '') {
    		j = JSON.parse(j)
    	}
    	return j.isobject ? JSON.parse(j.data) : j.data
    }
    $.longToDate = function(v) {
	    if (/^(-)?\d{1,10}$/.test(v)) {
	        v = v * 1000;
	    } else if (/^(-)?\d{1,13}$/.test(v)) {
	        v = v * 1000;
	    } else if (/^(-)?\d{1,14}$/.test(v)) {
	        v = v * 100;
	    } else if (/^(-)?\d{1,15}$/.test(v)) {
	        v = v * 10;
	    } else if (/^(-)?\d{1,16}$/.test(v)) {
	        v = v * 1;
	    } else {
	        // alert("时间戳格式不正确");
	        return v;
	    }
		var dateObj = new Date(v);
		var currDate = new Date();
	    if (dateObj.format('yyyy') == "NaN") {
	    	 // alert("时间戳格式不正确");
	    	 return v;
	    }
	    var UnixTimeToDate = ''
	    if(dateObj.getFullYear() != currDate.getFullYear()) UnixTimeToDate += dateObj.getFullYear() + '-'
	    if(dateObj.getFullYear() != currDate.getFullYear() || dateObj.getDate() != currDate.getDate()) {
	    	UnixTimeToDate += (dateObj.getMonth() + 1) + '-' + dateObj.getDate() + ' ';
	    }
	    UnixTimeToDate += dateObj.getHours() + ':' + dateObj.getMinutes();
	    return UnixTimeToDate;
    }
})(jQuery);


(function(app) {
	app = {
		get: (k) => {
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
		set: (k, v) => {
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
				this.openLoginActivity()
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
		openLoginActivity() {
			if(window.thirdtools && window.thirdtools.goLogin) {
				window.thirdtools.goLogin()
			}
		},
		openCommPopup(data) {
			if(!this.isLogin()) return
			eventbus.$emit(EVENTS.OPEN_COMM_POPUP, data)
		}
	}

	window.app = app

})({})