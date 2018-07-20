import jQuery from 'jquery'
import {brows} from './browsMap'

window.thirdtools = {
    getUid() {return 288},
    getArea() {return 1}
}

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

	    function dateUnitToString(unit) {
	    	if(parseInt(unit) < 10) {
	    		return "0" + unit
	    	}
	    	return unit
	    }

	    var UnixTimeToDate = ''
	    if(dateObj.getFullYear() != currDate.getFullYear()) UnixTimeToDate += dateObj.getFullYear() + '-'
	    // if(dateObj.getFullYear() != currDate.getFullYear() || dateObj.getDate() != currDate.getDate()) {
	    // 	UnixTimeToDate += (dateObj.getMonth() + 1) + '-' + dateObj.getDate() + ' ';
	    // }
	    UnixTimeToDate += (dateUnitToString(dateObj.getMonth() + 1)) + '-' + dateUnitToString(dateObj.getDate()) + ' ';
	    UnixTimeToDate += dateUnitToString(dateObj.getHours()) + ':' + dateUnitToString(dateObj.getMinutes());
	    return UnixTimeToDate;
    }
    $.stringEmpty = function(str) {
        if(!str || str == '') {
            return true
        }
        return false
    }
})(jQuery)