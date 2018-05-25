<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view" main>
        <f7-pages>
			<div data-page="chennels" class="page channels-page">		
				<div class="page-content">
					<div class="content-block-title">全部话题</div>
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
											<div class="item-subtitle" v-html="item.description"></div>
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
	import {http} from '../common/http'
	export default {
		data() {
			return {
				list: [],
				pageId: 1
			}
		},
		created() {
			this.getChannels()
		},
		methods: {
			getChannels() {
				var self = this
				var data = {
					api: 'page_type',
					pageid: this.pageId
				}
				http({
					data,
					method: 'post'
				}).then((res) => {
					var list = res.data.data
					var map = {}
					for(var i = 0; i < list.length; i++) {
						map[list[i].cid] = list[i]
					}
					app.set('channels', map)
					self.list = list
				})
			},
			onclick(data) {
				// var page = this.pageId == '1' ? 'sociality.html' : this.pageId == '2' ? 'news.html' : ''
				var page = 'sociality.html'
				window.location.href = page + '?webview_transition&channel=' + data.cid
			}
		}
	}
</script>