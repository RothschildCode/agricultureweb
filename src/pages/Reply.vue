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
			  	<p class="buttons-row editor-buttons-panel">
			  		<a href="#" class="button" @click="blow()">
			  			<i class="icon iconfont icon-smile"></i>
			  		</a>
			  		<a href="#" class="button">
			  			<i class="f7-icons">images</i>
			  		</a>
			  		<a href="#" class="button">
			  			<i class="f7-icons">camera</i>
			  		</a>
			  		<a href="#" class="button">
			  			<i class=""></i>
			  		</a>
			  		<a href="#" class="button">
			  			<i class=""></i>
			  		</a>
			  	</p>

			  	<brow-panel v-if="showBlowPanel"></brow-panel>

			  	<div v-if="!showBlowPanel" class="row">
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
				showBlowPanel: false
			}
		},
		created() {
			var _this = this
			bus.$on(EVENT.SEL_BROW, (d) => {
				_this.comment += '(/' + d.name + '/)'
			})
			this.replyType = $.getUrlParam('reply_type')
			this.args = {
				pid: $.getUrlParam('pid'),
				cid: $.getUrlParam('cid')
			}
		},
		methods: {
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
			blow() {
				this.showBlowPanel = !this.showBlowPanel
			},
			submit() {
				if(this.comment == '') {
					this.$f7.alert('内容不能为空', '')
					return
				}
				var param = {
					comment: this.comment,
					pid: this.args.pid
				}
				if(this.args.cid) {
					param.cid = this.args.cid
				}

				http({
					data: param,
					method: 'post'
				}).then((res) => {
					alert(res)
				})
				
			}
		},
		components: {
			BrowPanel
		}
	}
</script>