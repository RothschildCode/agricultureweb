<template>
	<div class="popup popup-common-editor common-editor" ref="popup">
		<canvas ref="cvs" style="display:none;"></canvas>
		<div class="wrap">
			<div class="row editor-area">
				<div class="editor-wrap" :class="{'col-80':multi != null, 'col-100': multi == null}" >
					<textarea v-model="comment" rows="3" class="comm-input" ref="commInput" :placeholder="name == null ? '发表你的看法吧' : '回复@' + name"></textarea>
					<div class="hidden" ref="trigger"></div>
				</div>
				<div v-if="multi != null && supportImage" class="col-20" @click="removeMulti">
					<!-- multi preview -->
					<div class="multi-wrap">
						<img width="100%" :src="multi">
						<div class="label">删除</div>
					</div>
				</div>
			</div>

			<div class="row">
			  	<div class="media-bar" style="border: none;">
			  		<div class="btn-item" @click="browBtnClick">
			  			<i class="icon iconfont icon-emoji"></i>
			  		</div>
			  		<div v-if="supportImage" class="btn-item">
			  			<i class="icon iconfont icon-xiangji"></i>
			  			<input accept="image/*" capture="camera" type="file" name="" class="upload-input" ref="uploadInput1" @change="uploadChange">
			  		</div>
			  		<div v-if="supportImage" class="btn-item">
			  			<i class="icon iconfont icon-pic"></i>
			  			<input accept="image/*" capture="camera" type="file" name="" class="upload-input" ref="uploadInput1" @change="uploadChange">
			  		</div>

			  		<div class="btn-item send">
			  			<span @click="submit()" :class="{active: comment != ''}">发送</span>
			  		</div>

			  	</div>				
			</div>
			<brow-panel ref="browpanel" :defaultClose="true"></brow-panel>
		</div>
	</div>
</template>

<script>
	import {gethttp} from '../common/http'
	import {eventbus, EVENTS} from '../js/bus'
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
				browOpened: false,
				multi: null,
				enclosures: [],
				initUploader: false,
				type: 1, //1.发帖 2.回复
				pageId: 0,
				topics: [],
				selTopic: {},
				pid: null,
				cid: null,
				name: null,
				brow: null,
				domObj: {},
				supportImage: false
			}
		},
		created() {
			var self = this
			eventbus.$on(EVENTS.SEL_BROW, (d) => {
				self.comment += d
			})
			eventbus.$on(EVENTS.OPEN_COMM_POPUP, (data) => {
				data.pid ? self.pid = data.pid : null
				data.cid ? self.cid = data.cid : null
				data.name ? self.name = data.name : null
				self.$f7.popup('.popup-common-editor')
			})
		},
		mounted() {
			var $pop = this.$$(this.$refs.popup)
			var $inp = this.$$(this.$refs.commInput)
			var vbrow = this.$refs.browpanel
			var self = this
			$pop.on('open', function () {
				self.focus()
			})
			$pop.on('close', () => {
				vbrow.close()
				$inp.blur()
			})
			$pop.on('closed', () => {
				self.cid = null
				self.name = null
				self.comment = ''
			})
			this.domObj.pop = $pop
			this.domObj.input = $inp
			this.domObj.brow = vbrow
		},
		methods: {
			focus() {
				this.domObj.input.focus()
			},
			blur() {
				this.domObj.input.blur()
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
			browBtnClick() {
				var self = this
				if(this.browOpened) {
					this.domObj.brow.close()
					self.focus()
				}else {
					this.blur()
					setTimeout(() => {
						self.domObj.brow.open()
					}, 200)
				}
				this.browOpened = !this.browOpened
			},
			submit() {
				if(this.comment == '') return
				this.reply()
			},
			reply() {
				var self = this
				var uploader = new EnclosureUploader()
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

					http({
						data: param,
						method: 'post'
					}).then((res) => {
						if(res.data.s == 0) {
							self.replySucc()
						}else {
							self.$f7.modal({
								title: '糟糕，回复失败了:(',
								buttons: [{
									text: '好'
								}]
							})
						}
					})
				})
			},
			selectedMulti(base64Data) {
				this.multi = base64Data
			},
			removeMulti() {
				this.multi = null
			},
			close() {

				this.$f7.closeModal('.popup-common-editor')
			},
			replySucc() {
				this.close()
				eventbus.$emit(EVENTS.COMMENT_SUCC, {pid: this.pid, cid: this.cid})
			}
		},
		components: {
			BrowPanel
		}
	}
</script>