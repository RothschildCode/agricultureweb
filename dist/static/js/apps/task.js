webpackJsonp([5],{124:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__=__webpack_require__(69),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__),__WEBPACK_IMPORTED_MODULE_1__component_MultiPreview__=__webpack_require__(54),__WEBPACK_IMPORTED_MODULE_1__component_MultiPreview___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__component_MultiPreview__),__WEBPACK_IMPORTED_MODULE_2__js_EnclosureUploader__=__webpack_require__(16),__WEBPACK_IMPORTED_MODULE_3__common_http__=__webpack_require__(1),http=__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__common_http__.a)({indicator:!0});__webpack_exports__.default={data:function(){return{list:[],args:{},currentItem:{},dataMap:{}}},created:function(){this.taskId=$.getUrlParam("taskId"),this.getContent()},methods:{taskToggle:function(task){task.opened=!task.opened},radioClick:function(index,value){this.dataMap[index].filled||(this.dataMap[index].result_value=value)},fill:function(item,index,arg){1==item.content_type&&(item.value=arg),2==item.content_type&&(item.value=$(arg.currentTarget).val()),item.filled=!0,this.$set(this.list,index,item)},select:function(item){this.currentItem=item},getContent:function(){var _this=this;http({data:{api:"site_content",check_up_id:this.taskId},method:"post"}).then(function(res){for(var list=res.data.data,dataMap=new Array,i=0;i<list.length;i++)1==list[i].content_type&&(list[i].opts=list[i].content_value.split("/")),dataMap.push({content_id:list[i].content_id,user_id:1,result_value:list[i].result_value,result_photos:list[i].result_photos,photo_urls:list[i].result_photos?list[i].result_photos.split(";"):[],photo_list:[],filled:null!=list[i].result_value&&""!=list[i].result_value});_this.dataMap=dataMap,_this.list=list}).catch(function(err){alert(err)})},done:function(){var _this=this;this.$f7.modal({title:"确定提交任务吗？",buttons:[{text:"提交",bold:!0,onClick:function(){for(var uploader=new __WEBPACK_IMPORTED_MODULE_2__js_EnclosureUploader__.a,doneCount=0,i=0;i<_this.dataMap.length;i++)!function(dataItem,len){uploader.upload(dataItem.photo_list,function(urlsText){dataItem.result_photos=urlsText,(doneCount+=1)>=len&&_this.post()})}(_this.dataMap[i],_this.dataMap.length)}},{text:"取消"}]})},post:function(){for(var _this2=this,set=new Array,i=0;i<this.dataMap.length;i++)""!=this.dataMap[i].result_value&&""!=this.dataMap[i].result_photos&&set.push({content_id:this.dataMap[i].content_id,user_id:1,result_value:this.dataMap[i].result_value,result_photos:this.dataMap[i].result_photos});http({data:{api:"site_result",uid:1,site_list:__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(set)},method:"post"}).then(function(res){0==res.data.s?_this2.$f7.alert("任务提交成功"):_this2.$f7.alert("任务提交失败")})}},components:{MultiPreview:__WEBPACK_IMPORTED_MODULE_1__component_MultiPreview___default.a}}},131:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0__main_js__=__webpack_require__(2),__WEBPACK_IMPORTED_MODULE_1__pages_Task__=__webpack_require__(87),__WEBPACK_IMPORTED_MODULE_1__pages_Task___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__pages_Task__);__WEBPACK_IMPORTED_MODULE_0__main_js__.a(__WEBPACK_IMPORTED_MODULE_1__pages_Task___default.a)},16:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__=__webpack_require__(18),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__),__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__=__webpack_require__(19),__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__),__WEBPACK_IMPORTED_MODULE_2__common_http__=__webpack_require__(1),EnclosureUploader=function(){function EnclosureUploader(){__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this,EnclosureUploader),this.resultSet=new Array,this.poster=__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_http__.b)()}return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(EnclosureUploader,[{key:"upload",value:function(files,callback){if(files.length<=0)callback();else{var _this=this;if(files&&files.length>0)for(var i=0;i<files.length;i++)_this.poster({data:{filetype:"image",name:"111.jpg",data:files[i]},method:"post"}).then(function(res){_this.resultSet.push(res.data),_this.resultSet.length>=files.length&&callback(_this.urlsText())});else callback(null)}}},{key:"urlsText",value:function(){for(var url="",i=0;i<this.resultSet.length;i++)0!=i&&(url+=";"),url+=this.resultSet[i];return url}}]),EnclosureUploader}();__webpack_exports__.a=EnclosureUploader},17:function(module,exports,__webpack_require__){module.exports={default:__webpack_require__(20),__esModule:!0}},18:function(module,exports,__webpack_require__){"use strict";exports.__esModule=!0,exports.default=function(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}},19:function(module,exports,__webpack_require__){"use strict";exports.__esModule=!0;var _defineProperty=__webpack_require__(17),_defineProperty2=function(obj){return obj&&obj.__esModule?obj:{default:obj}}(_defineProperty);exports.default=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),(0,_defineProperty2.default)(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}()},20:function(module,exports,__webpack_require__){__webpack_require__(23);var $Object=__webpack_require__(7).Object;module.exports=function(it,key,desc){return $Object.defineProperty(it,key,desc)}},204:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{attrs:{id:"app"}},[_c("f7-views",[_c("f7-view",{attrs:{id:"main-view",main:""}},[_c("f7-pages",[_c("div",{staticClass:"page task-page",attrs:{"data-page":"task"}},[_c("a",{staticClass:"floating-button color-pink",attrs:{href:"#"},on:{click:_vm.done}},[_c("i",{staticClass:"f7-icons"},[_vm._v("cloud_upload")])]),_vm._v(" "),_c("div",{staticClass:"page-content"},[_c("div",{staticClass:"list-block accordion-list"},[_c("ul",_vm._l(_vm.list,function(item,$index){return _c("li",{staticClass:"accordion-item",class:{selected:item.content_id==_vm.currentItem.content_id,"accordion-item-expanded":item.content_id==_vm.currentItem.content_id}},[_c("a",{staticClass:"item-content item-link",attrs:{href:"#"},on:{click:function($event){_vm.select(item)}}},[_c("div",{staticClass:"item-media"},[_vm.dataMap[$index].result_value&&""!=_vm.dataMap[$index].result_value?_c("i",{staticClass:"f7-icons",staticStyle:{color:"green"}},[_vm._v("check_round_fill")]):_vm._e()]),_vm._v(" "),_c("div",{staticClass:"item-inner"},[_c("div",{staticClass:"item-title",domProps:{innerHTML:_vm._s(item.content_title)}})])]),_vm._v(" "),_c("div",{staticClass:"accordion-item-content"},[_c("div",{staticClass:"content-block"},[1==item.content_type?_c("ul",_vm._l(item.opts,function(opt){return _c("li",[_c("label",{staticClass:"label-radio item-content"},[_c("input",{attrs:{type:"radio",name:"my-radio",disabled:_vm.dataMap[$index].filled},domProps:{checked:_vm.dataMap[$index].result_value==opt}}),_vm._v(" "),_c("div",{staticClass:"item-inner task-opt",class:{disabled:_vm.dataMap[$index].filled},on:{click:function($event){_vm.radioClick($index,opt)}}},[_c("div",{staticClass:"item-title",domProps:{innerHTML:_vm._s(opt)}})])])])})):_vm._e(),_vm._v(" "),2==item.content_type?_c("ul",[_c("li",[_c("div",{staticClass:"item-content"},[_c("div",{staticClass:"item-inner"},[_c("div",{staticClass:"item-input item-input-field"},[_c("textarea",{directives:[{name:"model",rawName:"v-model",value:_vm.dataMap[$index].result_value,expression:"dataMap[$index].result_value"}],attrs:{disabled:_vm.dataMap[$index].filled,placeholder:"点击填写"},domProps:{value:_vm.dataMap[$index].result_value},on:{change:function($event){_vm.fill(item,$index,$event)},input:function($event){$event.target.composing||_vm.$set(_vm.dataMap[$index],"result_value",$event.target.value)}}})])])])])]):_vm._e(),_vm._v(" "),item.photograph_group?_c("multi-preview",{attrs:{data:_vm.dataMap[$index].photo_list,readonly:_vm.dataMap[$index].photo_urls.length>0,urls:_vm.dataMap[$index].photo_urls}}):_vm._e()],1)])])}))])])])])],1)],1)],1)},staticRenderFns:[]}},23:function(module,exports,__webpack_require__){var $export=__webpack_require__(10);$export($export.S+$export.F*!__webpack_require__(5),"Object",{defineProperty:__webpack_require__(6).f})},36:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0}),__webpack_exports__.default={props:["data","urls","readonly","inputDom"],data:function(){return{maxSize:320,multis:[]}},created:function(){this.readonly&&(this.multis=this.urls)},watch:{inputDom:function(newVal,oldVal){this.uploadChange(newVal)}},methods:{uploadChange:function(e){var file,_this=this,loader=e.target;(file=loader.files[0])&&_this.compress(file),$(loader).val("")},compress:function(file){var _this=this,image=new Image,scale=1;image.src=URL.createObjectURL(file),image.onload=function(){var cvs=_this.$refs.cvs;(this.width>_this.maxSize||this.height>_this.maxSize)&&(scale=this.width>this.height?_this.maxSize/this.width:_this.maxSize/this.height),cvs.width=this.width*scale,cvs.height=this.height*scale,cvs.getContext("2d").drawImage(this,0,0,cvs.width,cvs.height);var newImageData=cvs.toDataURL("image/jpeg",.7);_this.selectedMulti(newImageData.replace("data:base64","data:image/jpeg;base64")),_this.data.push(newImageData.replace("data:image/jpeg;base64,",""))}},selectedMulti:function(base64Data){this.multis.push('url("'+base64Data+'")')},removeMulti:function(i){this.multis.splice(i,1)}}}},54:function(module,exports,__webpack_require__){var Component=__webpack_require__(0)(__webpack_require__(36),__webpack_require__(59),null,null);module.exports=Component.exports},59:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{staticClass:"multi-preview"},[_c("canvas",{ref:"cvs",staticStyle:{display:"none"}}),_vm._v(" "),_c("div",{staticClass:"multi-content",style:{width:95*(_vm.multis.length+1)+10+"px"}},[_vm._l(_vm.urls,function(item){return _vm.readonly?_c("div",{staticClass:"item"},[_c("span",{staticClass:"item-span",style:{backgroundImage:"url("+item+")"}})]):_vm._e()}),_vm._v(" "),_vm._l(_vm.multis,function(item,index){return _vm.readonly?_vm._e():_c("div",{staticClass:"item"},[_c("span",{staticClass:"item-span",style:{"background-image":item}}),_vm._v(" "),_c("a",{staticClass:"item-close",on:{click:function($event){_vm.removeMulti(index)}}},[_c("span",{staticClass:"btn-close"})])])}),_vm._v(" "),_vm.readonly?_vm._e():_c("div",{staticClass:"item add"},[_c("input",{ref:"uploadInput2",staticClass:"upload-input",attrs:{type:"file",name:""},on:{change:_vm.uploadChange}})])],2)])},staticRenderFns:[]}},87:function(module,exports,__webpack_require__){var Component=__webpack_require__(0)(__webpack_require__(124),__webpack_require__(204),null,null);module.exports=Component.exports}},[131]);