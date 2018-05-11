import jQuery from 'jquery'
import {brows} from './browsMap'
import {bus} from './bus'

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

	window.VueG = {
		loadPage: function(url) {
			bus.$f7.showIndicator()
			window.location.href = url
		}
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
		}
	}

	window.app = app

})({})