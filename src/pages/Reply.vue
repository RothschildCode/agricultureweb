<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view"  main>
        <f7-pages>
			<div class="page reply-page">	
				<canvas ref="cvs" style="display:none;"></canvas>
			  <div class="page-content">

		<div v-if="channel" class="list-block">
			<ul>
				<li class="item-content">
					<div class="item-media">
						<i class="icon icon-f7">
							<img :src="channel.icon">
						</i>
					</div>
					<div class="item-inner">
						<div>
							<div class="item-title" v-html="channel.cname"></div>
							<!-- <div class="item-subtitle" v-html="data.channel.description"></div> -->
						</div>
					</div>
				</li>
			</ul>
		</div>			  

				<a href="#" class="floating-button" @click="publish()">发布</a>

				<div class="content-block-title">帖子标题</div>

				<div class="list-block">
					<ul>
						<li>
							<div class="item-content">
								<div class="item-inner">
									<div class="item-input">
										<input v-model="subject" type="text" name="" placeholder="给帖子起一个标题吧">
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>	

				<div class="content-block-title">帖子内容</div>

				<div class="list-block">
					<ul>
						<li>
							<div class="item-content">
								<div class="item-inner">
									<div class="item-input">
										<textarea v-model="comment" placeholder="我来说两句"></textarea>
									</div>
								</div>
							</div>
							<multi-preview :data="enclosures" :inputDom="inputDom"></multi-preview>
<!-- 							<a class="chip topic-chip open-popup" data-popup=".popup-topic">
								<div class="chip-label">#{{selTopic.cname||'未选择话题'}}#</div>
							</a> -->							
						</li>
					</ul>
				</div>

			  </div>

			</div>
        </f7-pages>
      </f7-view>
    </f7-views>

    <div class="popup popup-topic">
    	<div class="navbar">
    		<div class="navbar-inner h-auto">
    			<div class="subnavbar tabs-row">
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

    <!-- <common-editor-popup></common-editor-popup> -->

  </div>
</template>

<script>
	import BrowPanel from '../component/BrowPanel'
	import ImageUploader from '../plugins/imguploader'
	import MultiPreview from '../component/MultiPreview'

	import {v, EVENTS} from '../core/vbus'

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
				cid: null,
				inputDom: null,
				brow: null
			}
		},
		watch: {
			brow(newVal, oldVal) {
				this.comment += newVal
			}
		},
		created() {
			var _this = this
			v.$on(EVENTS.SEL_BROW, (d) => {
				_this.comment += d
			})

			var params = this.appUtil.getCache('editor_page_params')

			this.replyType = params.replyType
			this.pid = params.pId
			this.cid = params.cId
			this.type = params.type
			this.pageId = params.pageId
			this.channel = params.channel

			if(this.type == 1) {
				this.getTopics()
			}

		},
		methods: {
			getTopics() {
				var self = this
				this.$ajax({
					data: {
						api: 'page_type',
						pageid: this.pageId
					}
				}, (data) => {
					self.topics = data
				})
			},
			uploadChange(e) {
				this.inputDom = e
				return
				var _this = this
				var loader = e.target
				var _URL = window.URL || window.webkitURL;

				this.multiUrl = _URL

				return

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
			publish() {
				if(this.subject == '') {
					this.$f7.modal({
						title: '写一个标题吧:(',
						buttons: [{
							text: '嗯，好的'
						}]
					})
					return
				}
				if(this.comment == '') {
					this.$f7.modal({
						title: '没有发表任何内容哦，写点东西吧:(',
						buttons: [{
							text: '嗯，好的'
						}]
					})
					return
				}

				var self = this

				if(this.channel.cid) {
					this.$f7.modal({
						title: '确定要发帖吗？',
						buttons: [{
							text: '发布',
							blod: true,
							onClick() {
								var uploader = new ImageUploader()

								self.appUtil.loginedInfo(({uid, area}) => {
									uploader.upload(self.enclosures, (urlsText) => {
										self.$ajax({
											data: {
												api: 'publish_post',
												cid: self.channel.cid,
												fid: 2,
												subject: self.subject,
												message: self.comment,
												pageid: self.pageId,
												img: urlsText,
												uid,
												area
											},
											errorMsg: '发布失败了:(',
											showLoading: true
										},(data) => {
											var msg = '发布成功:)'
											self.$f7.modal({
												title: msg,
												buttons: [{
													text: '好',
													onClick: function() {
														self.appUtil.applyNativeMethod('goFinash')
													}
												}]
											})
										})
									})					
								})
							}
						}, {
							text: '取消'
						}]
					})
					return
				}
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
				var self = this
				var uploader = new ImageUploader()
				uploader.upload(this.enclosures, function(urlsText) {
					var api = self.cid ? 'insert_reply' : 'insert_comment'
					var param = {
						api,
						pid: self.pid,
						uid: '1'
					}
					if(self.cid) {
						param.cid = self.cid
						param.content = self.comment
					}else {
						param.comment = self.comment
					}

					self.$ajax({
						data: param,
						errorMsg: '糟糕，回复失败了:('
					}, (data) => {
						var msg = '回复成功:)'
						self.$f7.modal({
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
			BrowPanel,
			// CommonFooterNav,
			// CommonEditorPopup,
			MultiPreview
		}
	}
</script>