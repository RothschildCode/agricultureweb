webpackJsonp([5],{124:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0__component_Subnavbar__=__webpack_require__(13),__WEBPACK_IMPORTED_MODULE_0__component_Subnavbar___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__component_Subnavbar__),__WEBPACK_IMPORTED_MODULE_1__js_bus__=__webpack_require__(4),__WEBPACK_IMPORTED_MODULE_2__common_http__=__webpack_require__(3);__webpack_exports__.default={data:function(){return{list:[],subnavbarItems:[],currentSubnav:{},pageIndex:1,pageSize:15,pageId:2,cid:null,f7CompInit:!1,loading:!1}},updated:function(){if(!this.f7CompInit){this.f7CompInit=!0;var _this=this,ptrContent=this.$$(this.$refs.pageContent);ptrContent.on("refresh",function(e){_this.refresh()}),ptrContent.on("infinite",function(){_this.loading||_this.load()})}},created:function(){__WEBPACK_IMPORTED_MODULE_1__js_bus__.a.$on(__WEBPACK_IMPORTED_MODULE_1__js_bus__.b.PULL_SCROLL_LOAD,this.pullScrollLoading),__WEBPACK_IMPORTED_MODULE_1__js_bus__.a.$on(__WEBPACK_IMPORTED_MODULE_1__js_bus__.b.SUBNAV_ITEM_TAP,this.subnavItemClick),this.cid=$.getUrlParam("cid"),this.getSubnavbars(),this.loadNews()},methods:{refresh:function(){this.pageIndex=1,this.loadNews(1)},load:function(){this.pageIndex+=1,this.loadNews()},goPublish:function(){window.location.href="reply.html?webview_transition&type=1&pageid="+this.pageId},getSubnavbars:function(){if(this.cid&&""!=this.cid)return void(this.subnavbarItems=app.get("subnavbar_info"));var _this=this,data={api:"page_type",pageid:this.pageId};__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_http__.c)({data:data,method:"post"}).then(function(res){var list=res.data.data;app.set("subnavbar_info",list),_this.subnavbarItems=list,_this.refresh()})},subnavItemClick:function(data){var url="info.html";data&&(url+="?cid="+data.cid),window.location.href=url},loadNews:function(){var _this2=this;this.pageIndex>1&&(this.loading=!0);var data={api:"college_post_list",displayNumber:this.pageSize,pageIndex:this.pageIndex,fid:2,pageid:this.pageId};this.cid&&""!=this.cid&&(data.cid=this.cid);var _this=this;this.loading=!0,__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_http__.c)({data:data,method:"post"}).then(function(res){for(var list=res.data.data,i=0;i<list.length;i++)list[i].cover="http://39.107.99.122/university/images/img_14347674602997.jpg",list[i].message=$.parseRichText(list[i].message);if(_this2.pageIndex>1)if(list.length>0){var newlist=_this.list.concat(list);_this.list=newlist}else _this.pageIndex-=1;else _this.list=list;1==_this2.pageIndex&&_this.$f7.pullToRefreshDone(),_this2.loading=!1}).catch(function(err){})},pullScrollLoading:function(pageIndex){this.loadNews(pageIndex)},newsClick:function(data){window.location.href="./newscontent.html?pid="+data.pid+"&webview_transition"},goReply:function(data){window.location.href="reply.html?webview_transition&type=2&pid="+data.pid}},components:{Subnavbar:__WEBPACK_IMPORTED_MODULE_0__component_Subnavbar___default.a}}},13:function(module,exports,__webpack_require__){var Component=__webpack_require__(0)(__webpack_require__(27),__webpack_require__(14),null,null);module.exports=Component.exports},130:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0__main_js__=__webpack_require__(2),__WEBPACK_IMPORTED_MODULE_1__pages_Info__=__webpack_require__(45),__WEBPACK_IMPORTED_MODULE_1__pages_Info___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__pages_Info__);__WEBPACK_IMPORTED_MODULE_0__main_js__.a(__WEBPACK_IMPORTED_MODULE_1__pages_Info___default.a)},14:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{staticClass:"navbar"},[_c("div",{staticClass:"navbar-inner h-auto"},[_c("div",{ref:"wrap",staticClass:"subnavbar"},[_c("div",{staticClass:"buttons-row"},[_c("a",{ref:"tabActive",staticClass:"button tab-link",class:{active:!_vm.cid},attrs:{href:"#"},on:{click:function($event){_vm.navClick(null,-1)}}},[_vm._v("推荐")]),_vm._v(" "),_vm._l(_vm.list,function(item){return _c("a",{ref:item.cid==_vm.cid?"tabActive":"tab",refInFor:!0,staticClass:"button tab-link",class:{active:item.cid==_vm.cid},attrs:{href:"#"},domProps:{innerHTML:_vm._s(item.cname)},on:{click:function($event){_vm.navClick(item)}}})})],2)])])])},staticRenderFns:[]}},27:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0__js_bus__=__webpack_require__(4);__webpack_exports__.default={props:["list","cid"],mounted:function(){var cw=document.body.clientWidth,$activeTab=$(this.$refs.tabActive),left=$activeTab.offset().left,$wrap=$(this.$refs.wrap),sl=left-(cw-$activeTab.width()-16)/2;console.log(sl),$wrap.scrollLeft(sl)},methods:{navClick:function(data){__WEBPACK_IMPORTED_MODULE_0__js_bus__.a.$emit(__WEBPACK_IMPORTED_MODULE_0__js_bus__.b.SUBNAV_ITEM_TAP,data)}}}},4:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",function(){return eventbus}),__webpack_require__.d(__webpack_exports__,"b",function(){return EVENTS});var __WEBPACK_IMPORTED_MODULE_0_vue__=__webpack_require__(5),eventbus=new __WEBPACK_IMPORTED_MODULE_0_vue__.default,EVENTS={PULL_SCROLL_LOAD:"PULL_SCROLL_LOAD",SUBNAV_ITEM_TAP:"SUBNAV_ITEM_TAP",MORE_OPERATION_TAP:"MORE_OPERATION_TAP"}},45:function(module,exports,__webpack_require__){var Component=__webpack_require__(0)(__webpack_require__(124),__webpack_require__(83),null,null);module.exports=Component.exports},83:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{attrs:{id:"app"}},[_c("f7-views",[_c("f7-view",{attrs:{id:"main-view",main:""}},[_c("subnavbar",{attrs:{list:_vm.subnavbarItems,cid:_vm.cid}}),_vm._v(" "),_c("f7-pages",[_c("div",{staticClass:"page news-page navbar-through",attrs:{"data-page":"news"}},[_c("a",{staticClass:"floating-button color-pink",attrs:{href:"#"},on:{click:_vm.goPublish}},[_c("i",{staticClass:"f7-icons"},[_vm._v("add")])]),_vm._v(" "),_c("div",{ref:"pageContent",staticClass:"page-content pull-to-refresh-content infinite-scroll",attrs:{"data-distance":"10"}},[_c("div",{staticClass:"pull-to-refresh-layer"},[_c("div",{staticClass:"preloader"}),_vm._v(" "),_c("div",{staticClass:"pull-to-refresh-arrow"})]),_vm._v(" "),_vm._l(_vm.list,function(item){return _c("div",{staticClass:"info-item",on:{click:function($event){_vm.newsClick(item)}}},[_c("div",{staticClass:"info-wrap",class:{horizontal:item.img&&item.img.length<3,vertical:item.img&&item.img.length>=3}},[_c("div",{staticClass:"info-inner"},[_c("div",{staticClass:"info-link"},[_c("div",[item.img&&item.img.length<3&&item.img.length>0?_c("div",{staticClass:"info-images"},[_c("div",{staticClass:"image-inner"},[_c("img",{attrs:{src:item.img[0]}})])]):_vm._e(),_vm._v(" "),_c("div",{staticClass:"info-title"},[_c("div",{staticClass:"title-inner",domProps:{innerHTML:_vm._s(item.subject)}})]),_vm._v(" "),item.img&&item.img.length>=3?_c("div",{staticClass:"info-images"},_vm._l(item.img,function(image){return _c("div",{staticClass:"image-item"},[_c("div",{staticClass:"image-item-inner"},[_c("img",{attrs:{src:image}})])])})):_vm._e(),_vm._v(" "),_c("div",{staticClass:"info-other"},[_c("span",{domProps:{innerHTML:_vm._s(item.cname)}},[_vm._v("双子娱类")]),_vm._v(" "),_c("span",[_vm._v(_vm._s(item.comment_num)+"评")])])])])])])])}),_vm._v(" "),_vm.list.length>=_vm.pageSize?_c("div",{staticClass:"infinite-scroll-preloader"},[_c("div",{staticClass:"preloader"})]):_vm._e()],2)])])],1)],1)],1)},staticRenderFns:[]}}},[130]);