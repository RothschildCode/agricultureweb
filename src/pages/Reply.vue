<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view"  main>
        <f7-pages>
			<div class="page page-bg-fill navbar-fixed reply-page">
			  <div class="page-content">
			  	<div class="editor_panel">
			  		<textarea rows="8" class="editor_input editor_content" placeholder="发表您的回复"></textarea>
			  	</div>
			  	<p class="buttons-row editor-buttons-panel">
			  		<a href="#" class="button">
			  			<svg class="icon" >
	                        <use xlink:href="#icon-weixiao"></use>
	                    </svg>
			  		</a>
			  		<a href="#" class="button">
			  			<i class=""></i>
			  		</a>
			  		<a href="#" class="button">
			  			<i class=""></i>
			  		</a>
			  		<a href="#" class="button">
			  			<i class=""></i>
			  		</a>
			  		<a href="#" class="button">
			  			<i class=""></i>
			  		</a>
			  	</p>
			  </div>
			</div>  
        </f7-pages>
      </f7-view>
    </f7-views>
  </div>
</template>

<style type="text/css">
.icon {
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}
</style>

<script>
	import {gethttp} from '../common/http'

	let http = gethttp({
		indicator: true
	})

	export default {
		data() {
			return {
				data: {}
			}
		},
		created() {
			// this.getContent()
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
			}
		}
	}
</script>