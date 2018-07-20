<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view" main>
        <f7-pages>
			<div data-page="chennels" class="page channels-page">		
				<div class="page-content">
					<div class="content-block-title" v-html="target == 2 ? '选择一个话题' : '全部话题'">全部话题</div>
					<div class="list-block">
						<ul>
							<li v-for="item in list" @click="onclick(item)">
								<a href="" class="item-link item-content">
									<div class="item-media">
										<i class="icon icon-f7">
											<img :src="item.icon">
										</i>
									</div>
									<div class="item-inner">
										<div>
											<div class="item-title" v-html="item.cname"></div>
											<!-- <div class="item-subtitle" v-html="item.description"></div> -->
										</div>
									</div>									
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
        </f7-pages>
      </f7-view>
    </f7-views>
  </div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				list: [],
				pageId: 1,
				dataCacheName: 'app_data_cache_channels',
				target: this.appUtil.getCache('channels_page_params').target
			}
		},
		created() {
			this.dataHandler(this.appUtil.getCache(this.dataCacheName))
			this.getChannels()
		},
		methods: {
			dataHandler(list) {
				if(!list) return
				this.list = list
				this.appUtil.putCache(this.dataCacheName, list)
			},
			getChannels() {
				var self = this
				var data = {
					api: 'page_type',
					pageid: this.pageId
				}
				this.$ajax({
					data: {
						api: 'page_type',
						pageid: this.pageId
					},
					errorMsg: '获取圈子列表失败:('
				}, (data) => {
					self.dataHandler(data)
				})
			},
			onclick(data) { 
				// var page = this.pageId == '1' ? 'sociality.html' : this.pageId == '2' ? 'news.html' : ''
				// var page = 'sociality.html'
				// window.location.href = this.appUtil.getCache('channels_tap_href') + '?webview_transition&channel=' + data.cid
				var params = this.appUtil.getCache('channels_page_params')
				switch(params.target) {
					case 1:
						window.location.href = 'sociality.html?webview_transition&channel=' + data.cid
						break
					case 2:
						this.appUtil.putCache('editor_page_params', {
							type: params.type,
							pageId: params.page,
							channel: data
						})
						this.appUtil.applyNativeMethod('goPublish', () => {
							window.location.href = 'reply.html'
						})
						break
				}
			}
		}
	}
</script>