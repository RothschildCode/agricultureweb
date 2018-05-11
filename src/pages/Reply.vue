<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view"  main>
        <f7-pages>
			<div class="page page-bg-fill reply-page">	
				<canvas ref="cvs" style="display:none;"></canvas>
			  <div class="page-content">
			  	<div class="editor_panel">
			  		<div class="editor_title_wrap">
			  			<input v-if="type==1" v-model="subject" type="text" class="editor_input" name="" placeholder="标题">
			  		</div>
			  		<textarea v-model="comment" rows="8" class="editor_input editor_content" :placeholder="type==1?'我来说两句':type==2?'发表您的回复':''"></textarea>
					  <a v-if="type==1" class="chip topic-chip open-popup" data-popup=".popup-topic">
					    <div class="chip-label">#{{selTopic.cname||'未选择话题'}}#</div>
					  .</a>
			  	</div>
			  	<div class="media-bar">
			  		<div class="btn-item" @click="changePanel(1)">
			  			<i v-if="showCode != 1" class="icon iconfont icon-emoji"></i>
			  			<i v-if="showCode == 1" class="icon iconfont active icon-emojifill"></i>
			  		</div>
			  		<div v-if="cid==null" class="btn-item" @click="changePanel(2)">
			  			<i v-if="showCode != 2" class="icon iconfont icon-xiangji"></i>
			  			<i v-if="showCode == 2" class="icon iconfont active icon-camerafill"></i>
			  			<input type="file" name="" class="upload-input" ref="uploadInput1" @change="uploadChange">
			  		</div>
			  		<div v-if="cid==null" class="btn-item" @click="changePanel(2)">
			  			<i v-if="showCode != 2" class="icon iconfont icon-pic"></i>
			  			<i v-if="showCode == 2" class="icon iconfont active icon-picfill"></i>
			  			<input type="file" name="" class="upload-input" ref="uploadInput1" @change="uploadChange">
			  		</div>
			  		<div v-if="type==1" class="btn-item">
			  			<a href="#" class="icon iconfont open-popup btn-topic" data-popup=".popup-topic">#</a>
			  		</div>

			  		<div class="btn-item send">
			  			<span @click="submit()">{{type==1?'发布':type==2?'回复':''}}</span>
			  		</div>

			  	</div>

			  	<brow-panel v-if="showCode == 1"></brow-panel>

			  	<div v-if="multis.length > 0 && showCode == 2" class="multi-preview">
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


			  </div>

			</div>  
        </f7-pages>
      </f7-view>
    </f7-views>

    <div class="popup popup-topic">
    	<div class="navbar">
    		<div class="navbar-inner h-auto">
    			<div class="subnavbar">
    				<div class="buttons-row">
    					<a class="button tab-link" @click="closePopup">
    						关闭
    					</a>
    				</div>
    			</div>
    		</div>
    	</div>
    	<div class="page navbar-through">
    		<div class="page-content">
	    		<div class="list-block">
	    			<ul>
		  				<li v-for="item in topics" class="item-content" @click="topicItemClick(item)">
		  					<div class="item-media">
		  						<i>#</i>
		  					</div>
		  					<div class="item-inner">
		  						<div class="item-title" v-html="item.cname"></div>
		  					</div>
		  				</li>
	    			</ul>
	    		</div>    			
    		</div>
    	</div>
    </div>

  </div>
</template>

<script>
	import {gethttp} from '../common/http'
	import {bus, EVENT} from '../common/bus'
	import BrowPanel from '../component/BrowPanel'
	import EnclosureUploader from '../js/EnclosureUploader'

	let http = gethttp({
		indicator: true
	})

	export default {
		data() {
			return {
				subject: '',
				comment: '',
				showCode: 0,
				multis: [],
				enclosures: [],
				initUploader: false,
				type: 1, //1.发帖 2.回复
				pageId: 0,
				topics: [],
				selTopic: {},
				pid: null,
				cid: null
			}
		},
		created() {
			var _this = this
			bus.$on(EVENT.SEL_BROW, (d) => {
				_this.comment += d
			})
			this.replyType = $.getUrlParam('reply_type')
			this.pid = $.getUrlParam('pid')
			this.cid = $.getUrlParam('cid'),
			this.type = $.getUrlParam('type')
			this.pageId = $.getUrlParam('pageid')

			if(this.type == 1) {
				this.getTopics()
			}

		},
		methods: {
			getTopics() {
				var _this = this
				var data = {
					api: 'page_type',
					pageid: this.pageId
				}
				http({
					data,
					method: 'post'
				}).then((res) => {
					var list = res.data.data
					_this.topics = list
				})
			},
			uploadChange(e) {
				var _this = this
				var loader = e.target
				var _URL = window.URL || window.webkitURL;
			    var file
			    if ((file = loader.files[0])) {
					var _this = this
			    	var image = new Image()
			    	var scale = 1
			    	image.src = URL.createObjectURL(file)
			    	image.onload = function() {
			    		var cvs = _this.$refs.cvs
			    		if(this.width > _this.maxSize || this.height > _this.maxSize) {
			    			if(this.width > this.height) {
			    				scale = _this.maxSize / this.width
			    			}else {
			    				scale = _this.maxSize / this.height
			    			}
			    		}
			    		cvs.width = this.width * scale
			    		cvs.height = this.height * scale
			    		var ctx = cvs.getContext('2d')
			    		ctx.drawImage(this, 0, 0, cvs.width, cvs.height)
			    		var newImageData = cvs.toDataURL('image/jpeg', 0.7)
	            		_this.selectedMulti(newImageData.replace('data:base64', 'data:image/jpeg;base64'))
	            		_this.enclosures.push(newImageData.replace('data:image/jpeg;base64,', ''))
			    	}
			    }
			    $(loader).val('')
			},
			changePanel(code) {
				if(code == 1 || code == 3) {
					code = this.showCode == code ? 0 : code
				}
				this.showCode = code
			},
			submit() {
				switch(this.type) {
					case '1':
						this.publish()
						break
					case '2':
						this.reply()
						break
					default:
						break
				}
			},			
			publish() {
				if(!this.selTopic.cid) {
					this.$f7.modal({
						title: '选择一个话题吧:(',
						buttons: [{
							text: '嗯，好的'
						}]
					})
					return
				}

				var _this = this

				var uploader = new EnclosureUploader()

				uploader.upload(this.enclosures, (urlsText) => {
					var param = {
						api: 'publish_post',
						cid: _this.selTopic.cid,
						uid: 1,
						fid: 2,
						subject: _this.subject,
						message: _this.comment,
						pageid: _this.pageId,
						img: urlsText
					}
					http({
						data: param,
						method: 'POST'
					}).then((res) => {
						var msg = ''
						if(res.data.s == 0) {
							msg = '发布成功:)'
						}else {
							msg = '发布失败了:('
						}
						_this.$f7.modal({
							title: msg,
							buttons: [{
								text: '好'
							}]
						})

					})
				})
			},
			reply() {
				if(this.comment == '') {
					this.$f7.modal({
						title: '内容不能为空，写点东西吧:(',
						buttons: [{
							text: '这就去写'
						}]
					})
					return
				}
				var _this = this
				var uploader = new EnclosureUploader()
				uploader.upload(this.enclosures, function(urlsText) {
					var api = _this.cid ? 'insert_reply' : 'insert_comment'
					var param = {
						api,
						pid: _this.pid,
						uid: '1'
					}
					if(_this.cid) {
						param.cid = _this.cid
						param.content = _this.comment
					}else {
						param.comment = _this.comment
					}

					http({
						data: param,
						method: 'post'
					}).then((res) => {
						var msg = ''
						if(res.statusText == "OK") {
							msg = '回复成功:)'
						}else {
							msg = '糟糕，回复失败了:('
						}
						_this.$f7.modal({
							title: msg,
							buttons: [{
								text: '好'
							}]
						})
					})
				})
			},
			selectedMulti(base64Data) {
				this.multis.push('url("' + base64Data + '")')
			},
			removeMulti(i) {
				this.multis.splice(i, 1)
				this.enclosures.splice(i, 1)
			},
			topicItemClick(data) {
				this.selTopic = data
				this.closePopup()
			},
			closePopup() {
				this.$f7.closeModal('.popup-topic')
			}
		},
		components: {
			BrowPanel
		}
	}
</script>