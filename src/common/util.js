import jQuery from 'jquery'
import {brows} from './browsMap'
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

})(jQuery);