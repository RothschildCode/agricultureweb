<template>
  <!-- App -->
  <div id="app">

  <div class="panel-overlay"></div>
 
  <!-- Left Panel with Reveal effect -->
  <div class="panel panel-left panel-reveal">
    <div class="content-block">
      <p>Left Panel content here</p>
      <!-- Click on link with "close-panel" class will close panel -->
      <p><a href="#" class="close-panel">Close me</a></p>
      <!-- Click on link with "open-panel" and data-panel="right" attribute will open Right panel -->
      <p><a href="#" data-panel="right" class="open-panel">Open Right Panel</a></p>
    </div>
  </div>

    <!-- Main Views -->
    <f7-views>
      <f7-view id="main-view" main> 
        <f7-pages>
			<div data-page="taskClassify" class="page navbar-fixed toobar-fixed task-classify-page">
				<div class="page-content">
					<div v-for="item in list" class="card">
						<div class="card-header" v-html="item.contentTitle"></div>
						<div class="card-content">
							<div class="card-content-inner">
								
							</div>
						</div>
						<div class="card-footer">
							<a v-html="item.cname"></a>
						</div>
					</div>
				</div>
			</div>
        </f7-pages>
      </f7-view>
    </f7-views>
  </div>
</template>

<script>
  import http from '../common/http'
  export default {
  	data() {
  		return {
  			list: []
  		}
  	},
	created() {
		http({
			data: {
				api: 'site_check_group',
				uid: 1
			},
			method: 'post'
		}).then((res) => {
			// var list = res.data
			// for(var i = 0; i < list.length; i++) {
			// 	list[i].cover = 'http://peining.tunnel.echomod.cn/university/images/img_14347674602997.jpg'
			// }
			// this.list = list
		}).catch((err) => {
			alert('Network Error')
		})
	}
  }
</script>