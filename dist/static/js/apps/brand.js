webpackJsonp([8],{135:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{attrs:{id:"app"}},[_c("f7-views",[_c("f7-view",{attrs:{id:"main-view",main:""}},[_c("f7-pages",[_c("div",{staticClass:"page channels-page",attrs:{"data-page":"chennels"}},[_c("div",{staticClass:"page-content"},[_c("div",{staticClass:"content-block-title"},[_vm._v("已选择品牌")]),_vm._v(" "),_c("div",{staticClass:"content-block"},[_c("div",{staticClass:"content-block-inner"},[_vm.selectedList.length<=0?_c("p",{staticClass:"align-center font-empty-desc"},[_vm._v("未选择任何品牌")]):_vm._e(),_vm._v(" "),_vm._l(_vm.selectedList,function(item){return _c("a",{staticClass:"chip topic-chip open-popup"},[_c("div",{staticClass:"chip-label",domProps:{innerHTML:_vm._s(item.brand_name)}}),_vm._v(" "),_c("a",{staticClass:"chip-delete",attrs:{href:"#"},on:{click:function($event){_vm.brandFollow(item,2)}}})])})],2)]),_vm._v(" "),_c("div",{staticClass:"list-block theme-orange"},[_c("ul",_vm._l(_vm.list,function(item){return _c("li",{staticClass:"item-content"},[_c("div",{staticClass:"item-media"},[_c("i",{staticClass:"icon icon-f7 border-shape-circle"},[_c("img",{attrs:{src:item.brand_icon}})])]),_vm._v(" "),_c("div",{staticClass:"item-inner"},[_c("div",{staticClass:"item-title"},[_c("div",{domProps:{innerHTML:_vm._s(item.brand_name)}})]),_vm._v(" "),_c("div",{staticClass:"item-after"},[0==item.selected?_c("a",{staticClass:"button active",on:{click:function($event){_vm.brandFollow(item,1)}}},[_vm._v("关注")]):_vm._e(),_vm._v(" "),0!=item.selected?_c("a",{staticClass:"button"},[_vm._v("已关注")]):_vm._e()])])])}))])])])])],1)],1)],1)},staticRenderFns:[]}},204:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0}),__webpack_exports__.default={data:function(){return{list:[],selectedList:[],dataCacheName:"app_cache_data_brands"}},created:function(){this.getBrands()},methods:{getHistoryData:function(){this.dataHandler(this.appUtil.getCache(this.dataCacheName))},getBrands:function(){var self=this;this.appUtil.loginedInfo(function(_ref){var uid=_ref.uid,area=_ref.area;self.$ajax({data:{api:"follow_brand_list",uid:uid,area:area}},function(data){self.appUtil.putCache(self.dataCacheName,data),self.dataHandler(data)})})},dataHandler:function(list){for(var selectedList=new Array,i=0;i<list.length;i++)0!=list[i].selected&&selectedList.push(list[i]);this.list=list,this.selectedList=selectedList},brandFollow:function(b,addOrRemove){var self=this;this.appUtil.loginedInfo(function(_ref2){var uid=_ref2.uid,api="";switch(addOrRemove){case 1:api="uid_brand_commit";break;case 2:api="uid_brand_remove"}self.$ajax({data:{api:api,uid:uid,brand_id:b.brand_id},errorMsg:"选择品牌失败"},function(data){self.getBrands()})})}}}},212:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0__main_js__=__webpack_require__(2),__WEBPACK_IMPORTED_MODULE_1__pages_Brand__=__webpack_require__(89),__WEBPACK_IMPORTED_MODULE_1__pages_Brand___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__pages_Brand__);__WEBPACK_IMPORTED_MODULE_0__main_js__.a(__WEBPACK_IMPORTED_MODULE_1__pages_Brand___default.a)},89:function(module,exports,__webpack_require__){var Component=__webpack_require__(0)(__webpack_require__(204),__webpack_require__(135),null,null);module.exports=Component.exports}},[212]);