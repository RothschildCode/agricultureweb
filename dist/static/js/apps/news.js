webpackJsonp([3],{113:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0}),__webpack_exports__.default={props:["data"],methods:{onclick:function(){window.location.href="./content.html?pid="+this.data.pid+"&webview_transition"}}}},114:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0__base_MeScrollContainer__=__webpack_require__(56),__WEBPACK_IMPORTED_MODULE_0__base_MeScrollContainer___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__base_MeScrollContainer__),__WEBPACK_IMPORTED_MODULE_1__NewsWrap__=__webpack_require__(187),__WEBPACK_IMPORTED_MODULE_1__NewsWrap___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__NewsWrap__),__WEBPACK_IMPORTED_MODULE_2__common_http__=__webpack_require__(1);__webpack_exports__.default={extends:__WEBPACK_IMPORTED_MODULE_0__base_MeScrollContainer___default.a,props:["condition"],data:function(){return{pageId:2,loaded:!1}},created:function(){this.data={list:[]}},methods:{getListData:function(page){var param={api:"college_post_list",displayNumber:this.pageSize,pageIndex:page.num,fid:2,pageid:this.pageId};this.condition&&this.condition.cid&&(param.cid=this.condition.cid);var self=this;__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_http__.c)({data:param,method:"post"}).then(function(res){for(var list=res.data.data,i=0;i<list.length;i++)list[i].cover="http://39.107.99.122/university/images/img_14347674602997.jpg",list[i].message=$.parseRichText(list[i].message);self.loaded=!0,self.getDone(!0,list,page.num)}).catch(function(err){self.getDone(!1)})}},components:{ContentWrap:__WEBPACK_IMPORTED_MODULE_1__NewsWrap___default.a}}},115:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0__News__=__webpack_require__(185),__WEBPACK_IMPORTED_MODULE_0__News___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__News__);__webpack_exports__.default={props:["data","loaded"],components:{News:__WEBPACK_IMPORTED_MODULE_0__News___default.a}}},121:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0__component_NewsContainer__=__webpack_require__(186),__WEBPACK_IMPORTED_MODULE_0__component_NewsContainer___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__component_NewsContainer__),__WEBPACK_IMPORTED_MODULE_1__component_Subnavbar__=__webpack_require__(55),__WEBPACK_IMPORTED_MODULE_1__component_Subnavbar___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__component_Subnavbar__),__WEBPACK_IMPORTED_MODULE_2__component_MediaWrap__=__webpack_require__(14),__WEBPACK_IMPORTED_MODULE_2__component_MediaWrap___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__component_MediaWrap__),__WEBPACK_IMPORTED_MODULE_3__js_bus__=__webpack_require__(3),__WEBPACK_IMPORTED_MODULE_4__common_http__=__webpack_require__(1),__WEBPACK_IMPORTED_MODULE_5_swiper__=__webpack_require__(32),__WEBPACK_IMPORTED_MODULE_5_swiper___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_swiper__);__webpack_exports__.default={data:function(){return{subnavbarItems:[],swiper:null,tabIndex:0,pageId:2,mescrollArr:[]}},created:function(){__WEBPACK_IMPORTED_MODULE_3__js_bus__.a.$on(__WEBPACK_IMPORTED_MODULE_3__js_bus__.b.SUBNAV_ITEM_TAP,this.tabChange),this.getSubnavbars()},updated:function(){if(null==this.swiper){var self=this;$(this.$refs.swiper);this.swiper=new __WEBPACK_IMPORTED_MODULE_5_swiper___default.a(".swiper-container",{on:{slideChangeTransitionEnd:function(){self.tabChange(this.snapIndex)}}})}},methods:{tabChange:function(index){this.tabIndex=index,this.swiper.slideTo(index,0)},getSubnavbars:function(){var _this=this,data={api:"page_type",pageid:this.pageId};__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__common_http__.c)({data:data,method:"post"}).then(function(res){var list=res.data.data;_this.subnavbarItems=list})},goPublish:function(){window.location.href="reply.html?webview_transition&type=1&pageid="+this.pageId}},components:{NewsContainer:__WEBPACK_IMPORTED_MODULE_0__component_NewsContainer___default.a,Subnavbar:__WEBPACK_IMPORTED_MODULE_1__component_Subnavbar___default.a,MediaWrap:__WEBPACK_IMPORTED_MODULE_2__component_MediaWrap___default.a}}},128:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0__main_js__=__webpack_require__(2),__WEBPACK_IMPORTED_MODULE_1__pages_News__=__webpack_require__(84),__WEBPACK_IMPORTED_MODULE_1__pages_News___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__pages_News__);__WEBPACK_IMPORTED_MODULE_0__main_js__.a(__WEBPACK_IMPORTED_MODULE_1__pages_News___default.a)},14:function(module,exports,__webpack_require__){var Component=__webpack_require__(0)(__webpack_require__(15),__webpack_require__(24),null,null);module.exports=Component.exports},15:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0}),__webpack_exports__.default={props:["medias","block"],data:function(){return{size:.32*(document.body.clientWidth-34),mediasData:[]}},created:function(){this.init()},methods:{init:function(){for(var mediasData=new Array,i=0;i<this.medias.length;i++){var w=this.size+"px",h=this.size+"px",bg="url("+this.medias[i]+")";1==this.medias.length?mediasData.push({backgroundImage:bg}):mediasData.push({width:w,height:h,backgroundImage:bg})}this.mediasData=mediasData},preview:function(index){this.$f7.photoBrowser({photos:this.medias,initialSlide:index,theme:"dark",backLinkText:"关闭"}).open()}}}},185:function(module,exports,__webpack_require__){var Component=__webpack_require__(0)(__webpack_require__(113),__webpack_require__(197),null,null);module.exports=Component.exports},186:function(module,exports,__webpack_require__){var Component=__webpack_require__(0)(__webpack_require__(114),null,null,null);module.exports=Component.exports},187:function(module,exports,__webpack_require__){var Component=__webpack_require__(0)(__webpack_require__(115),__webpack_require__(202),null,null);module.exports=Component.exports},191:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{attrs:{id:"app"}},[_c("f7-views",[_c("f7-view",{attrs:{id:"main-view",main:""}},[_c("subnavbar",{attrs:{list:_vm.subnavbarItems,activeIndex:_vm.tabIndex,more:!1,mescrollArr:_vm.mescrollArr}}),_vm._v(" "),_c("f7-pages",[_c("div",{staticClass:"page news-page navbar-through",attrs:{"data-page":"news"}},[_c("div",{staticClass:"page-content"},[_c("div",{ref:"swiper",staticClass:"swiper-container"},[_c("div",{staticClass:"swiper-wrapper"},_vm._l(_vm.subnavbarItems,function(item,$index){return _c("div",{staticClass:"swiper-slide"},[_c("news-container",{attrs:{uniqueKey:$index,condition:item,initload:$index==_vm.tabIndex,mescrollArr:_vm.mescrollArr}})],1)}))])])])])],1)],1)],1)},staticRenderFns:[]}},197:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{staticClass:"news-item",on:{click:_vm.onclick}},[_c("a",{staticClass:"news-link clearfix"},[_c("div",{staticClass:"news-detail",class:{desc:_vm.data.img.length>0&&""!=_vm.data.img[0]}},[_c("h3",{staticClass:"title",domProps:{innerHTML:_vm._s(_vm.data.subject)}}),_vm._v(" "),_vm.data.img.length>2?_c("media-wrap",{attrs:{medias:_vm.data.img}}):_vm._e(),_vm._v(" "),_c("div",{staticClass:"news-info"},[_c("div",[_c("span",{domProps:{innerHTML:_vm._s(_vm.data.cname)}}),_vm._v(" "),_c("span",[_vm._v(_vm._s(_vm.data.comment_num)+"评")])])])],1),_vm._v(" "),_vm._l(_vm.data.img,function(img,$index){return 0==$index&&""!=_vm.data.img[0]?_c("div",{staticClass:"news-img-holder",style:{backgroundImage:"url("+img+")"}}):_vm._e()})],2)])},staticRenderFns:[]}},202:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",[_vm.data.channel?_c("div",{staticClass:"list-block"},[_c("ul",[_c("li",{staticClass:"item-content"},[_c("div",{staticClass:"item-media"},[_c("i",{staticClass:"icon icon-f7"},[_c("img",{attrs:{src:_vm.data.channel.icon}})])]),_vm._v(" "),_c("div",{staticClass:"item-inner"},[_c("div",[_c("div",{staticClass:"item-title",domProps:{innerHTML:_vm._s(_vm.data.channel.cname)}}),_vm._v(" "),_c("div",{staticClass:"item-subtitle",domProps:{innerHTML:_vm._s(_vm.data.channel.description)}})])])])])]):_vm._e(),_vm._v(" "),_vm._l(_vm.data.list,function(item){return _c("news",{attrs:{data:item}})})],2)},staticRenderFns:[]}},24:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{staticClass:"medias-wrap",class:{"medias-block-wrap":_vm.block}},[_vm._l(_vm.medias,function(image,$index){return _vm.block?_c("img",{attrs:{src:image},on:{click:function($event){$event.stopPropagation(),_vm.preview($index)}}}):_vm._e()}),_vm._v(" "),_vm._l(_vm.mediasData,function(sty,$index){return!_vm.block&&$index<3?_c("div",{staticClass:"medias-item",class:{"medias-one-pic":1==_vm.mediasData.length,"medias-multi-pic":_vm.mediasData.length>1},style:sty,on:{click:function($event){$event.stopPropagation(),_vm.preview($index)}}}):_vm._e()})],2)},staticRenderFns:[]}},37:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0__js_bus__=__webpack_require__(3);__webpack_exports__.default={props:["list","activeIndex","more","mescrollArr"],updated:function(){var mescrollArr=this.mescrollArr;if(mescrollArr&&mescrollArr[this.activeIndex]){var curNavDom=this.$refs.activeDom[0]?this.$refs.activeDom[0]:this.$refs.activeDom,scrollxContent=this.$refs.scrollContent,star=scrollxContent.scrollLeft,end=curNavDom.offsetLeft+curNavDom.clientWidth/2-document.body.clientWidth/2;mescrollArr[this.activeIndex].getStep(star,end,function(step,timer){scrollxContent.scrollLeft=step}),mescrollArr[this.activeIndex].hideTopBtn();var curMescroll=this.mescrollArr[this.activeIndex];curMescroll.getScrollTop()>=curMescroll.optUp.toTop.offset?curMescroll.showTopBtn():curMescroll.hideTopBtn()}},methods:{navClick:function(index){__WEBPACK_IMPORTED_MODULE_0__js_bus__.a.$emit(__WEBPACK_IMPORTED_MODULE_0__js_bus__.b.SUBNAV_ITEM_TAP,index)}}}},38:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0}),__webpack_exports__.default={props:["uniqueKey","initload","mescrollArr"],data:function(){return{data:{},pageSize:15,mescroll:null,ids:{mescroll:"mescroll"+this.uniqueKey,emptyWrap:"empty-wrap"+this.uniqueKey}}},watch:{initload:function(curVal,oldVal){1!=curVal||this.loaded||this.init()}},mounted:function(){this.init()},methods:{init:function(){1==this.initload&&null==this.mescroll&&(this.mescroll=new MeScroll(this.ids.mescroll,{up:{callback:this.upCallback,isBounce:!1,empty:{icon:__webpack_require__(52),tip:"暂无相关数据~"},clearEmptyId:this.ids.emptyWrap}}),this.mescrollArr&&this.mescrollArr.push(this.mescroll))},upCallback:function(page){this.getListData(page)},getDone:function(isSucc,list,pageIndex){isSucc?(this.mescroll.endSuccess(list.length,list.length>=this.displayNumber),this.data.list=pageIndex>1?data.list.concat(list):list):(this.mescroll.endErr(),this.pageIndex-=pageIndex>1?1:0)}},components:{ContentWrap:{}}}},52:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/img/mescroll-empty.png"},55:function(module,exports,__webpack_require__){var Component=__webpack_require__(0)(__webpack_require__(37),__webpack_require__(57),null,null);module.exports=Component.exports},56:function(module,exports,__webpack_require__){var Component=__webpack_require__(0)(__webpack_require__(38),__webpack_require__(58),null,null);module.exports=Component.exports},57:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{staticClass:"navbar"},[_c("div",{staticClass:"navbar-inner h-auto"},[_c("div",{ref:"scrollContent",staticClass:"subnavbar"},[_c("div",{staticClass:"buttons-row"},[_c("a",{ref:0==_vm.activeIndex?"activeDom":"",staticClass:"button tab-link",class:{active:0==_vm.activeIndex},attrs:{href:"#"},on:{click:function($event){_vm.navClick(0)}}},[_vm._v("全部")]),_vm._v(" "),_vm._l(_vm.list,function(item,$index){return 0!=$index?_c("a",{ref:$index==_vm.activeIndex?"activeDom":"",refInFor:!0,staticClass:"button tab-link",class:{active:$index==_vm.activeIndex},attrs:{href:"#"},domProps:{innerHTML:_vm._s(item.cname)},on:{click:function($event){_vm.navClick($index)}}}):_vm._e()}),_vm._v(" "),_vm.more?_c("a",{staticClass:"button tab-link more",on:{click:function($event){_vm.navClick(-1)}}},[_c("i",{staticClass:"f7-icons fontsize-2x"},[_vm._v("more")])]):_vm._e()],2)])])])},staticRenderFns:[]}},58:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{staticClass:"mescroll",staticStyle:{height:"-webkit-fill-available",overflow:"scroll"},attrs:{id:_vm.ids.mescroll}},[_c("div",[_c("div",{attrs:{id:_vm.ids.emptyWrap}}),_vm._v(" "),_c("content-wrap",{attrs:{data:_vm.data,loaded:_vm.loaded}})],1)])},staticRenderFns:[]}},84:function(module,exports,__webpack_require__){var Component=__webpack_require__(0)(__webpack_require__(121),__webpack_require__(191),null,null);module.exports=Component.exports}},[128]);