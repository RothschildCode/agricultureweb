<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view"  main>
        <f7-pages>
			<div class="page page-bg-fill navbar-fixed reply-page">			
			  <div class="page-content">
			  	<div class="editor_panel">
			  		<textarea v-model="comment" rows="8" class="editor_input editor_content" placeholder="发表您的回复"></textarea>
			  	</div>
			  	<div class="media-bar">
			  		<div class="btn-item" @click="changePanel(1)">
			  			<i v-if="showCode != 1" class="icon iconfont icon-emoji"></i>
			  			<i v-if="showCode == 1" class="icon iconfont active icon-emojifill"></i>
			  		</div>
			  		<div class="btn-item" @click="changePanel(2)">
			  			<i v-if="showCode != 2" class="icon iconfont icon-xiangji"></i>
			  			<i v-if="showCode == 2" class="icon iconfont active icon-camerafill"></i>
			  			<input type="file" name="" class="upload-input" ref="uploadInput1" @change="uploadChange">
			  		</div>
			  		<div class="btn-item" @click="changePanel(2)">
			  			<i v-if="showCode != 2" class="icon iconfont icon-pic"></i>
			  			<i v-if="showCode == 2" class="icon iconfont active icon-picfill"></i>
			  			<input type="file" name="" class="upload-input" ref="uploadInput1" @change="uploadChange">
			  		</div>
			  	</div>

			  	<brow-panel v-if="showCode == 1"></brow-panel>

			  	<div v-if="multis.length > 0 && showCode > 1" class="multi-preview">
			  		<div class="multi-content" :style="{width: (95 * (multis.length + 1)) + 10 + 'px'}">
				  		<div v-for="(item, index) in multis" class="item">
				  			<span class="item-span" :style="{'background-image': item}"></span>
				  			<a class="item-close" @click="removeMulti(index)">
				  				<span class="btn-close"></span>
				  			</a>
				  		</div>
				  		<div class="item add">
				  			<input type="file" name="" class="upload-input" ref="uploadInput2" @change="uploadChange">
				  		</div>			  			
			  		</div>
			  	</div>

			  	<div v-if="showCode == 0" class="row">
			  		<div class="col-20"></div>
			  		<div class="col-60">
			  			<a href="#" class="button button-big button-fill" style="margin: 5em 0;" @click="submit()">发布</a>
			  		</div>
			  		<div class="col-20"></div>
			  	</div>

			  </div>

			</div>  
        </f7-pages>
      </f7-view>
    </f7-views>

	<!-- Links popover -->
	<div class="popover popover-links">
	<div class="popover-angle"></div>
	<div class="popover-inner">
	  <div class="list-block">
	    <ul>
	      <li><a href="#" class="list-button item-link">回复</a></li>
	     <!--  <li><a href="#" class="list-button item-link">Link 2</a></li>
	      <li><a href="#" class="list-button item-link">Link 3</a></li>
	      <li><a href="#" class="list-button item-link">Link 4</a></li> -->
	    </ul>
	  </div>
	</div>
	</div>

  </div>
</template>

<script>
	import {gethttp} from '../common/http'
	import {bus, EVENT} from '../common/bus'
	import BrowPanel from '../component/BrowPanel'

	let http = gethttp({
		indicator: true
	})

	export default {
		data() {
			return {
				comment: '',
				showCode: 0,
				multis: [],
				initUploader: false
			}
		},
		created() {
			var _this = this
			bus.$on(EVENT.SEL_BROW, (d) => {
				_this.comment += d
			})
			this.replyType = $.getUrlParam('reply_type')
			this.args = {
				pid: $.getUrlParam('pid'),
				cid: $.getUrlParam('cid')
			}
		},
		methods: {
			uploadChange(e) {
				var _this = this
				var loader = e.target
				var _URL = window.URL || window.webkitURL;
			    var file
			    if ((file = loader.files[0])) {
			        var reader = new FileReader();
			        reader.readAsDataURL(file);
			        reader.onload = function (e) { 
			        	_this.selectedMulti(this.result)
			        }
			    }
			    $(loader).val('')
			},
			getContent() {
				var pid = $.getUrlParam('pid')
				var _this = this
				http({
					data: {
						api: 'post_details',
						pid
					},
					method: 'post'
				}).then((res) => {
					var d = res.data
					d.cover = 'http://peining.tunnel.echomod.cn/university/images/img_14347674602997.jpg'
					_this.data = d
				}).catch((err) => {

				})
			},
			changePanel(code) {
				if(code == 1) {
					code = this.showCode == code ? 0 : code
				}
				this.showCode = code
			},
			submit() {
				if(this.comment == '') {
					this.$f7.alert('内容不能为空', '')
					return
				}
				var api = this.args.cid ? 'insert_reply' : 'insert_comment'
				var param = {
					api,
					pid: this.args.pid,
					uid: '1'
				}
				if(this.args.cid) {
					param.cid = this.args.cid
					param.content = this.comment
				}else {
					param.comment = this.comment
				}

				http({
					data: param,
					method: 'post'
				}).then((res) => {
					if(res.statusText == "OK") {
						this.$f7.alert('回复成功', '')
					}
				})
				
			},
			selectedMulti(base64Data) {
				this.multis.push('url("' + base64Data + '")')
			},
			removeMulti(i) {
				this.multis.splice(i, 1)
			}
		},
		components: {
			BrowPanel
		}
	}
</script>