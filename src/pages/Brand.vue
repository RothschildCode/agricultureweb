<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view" main>
        <f7-pages>
			<div data-page="chennels" class="page channels-page">		
				<div class="page-content">
					<div class="content-block-title">已选择品牌</div>
					<div class="content-block">
						<div class="content-block-inner">
							<p class="align-center font-empty-desc" v-if="selectedList.length <= 0">未选择任何品牌</p>
							<a v-for="item in selectedList" class="chip topic-chip open-popup">
								<div class="chip-label" v-html="item.brand_name"></div>
								<a href="#" class="chip-delete" @click="brandFollow(item, 2)"></a>
							</a>
						</div>
					</div>

					<div class="list-block theme-orange">
						<ul>
					        <li class="item-content" v-for="item in list">
					          <div class="item-media">
									<i class="icon icon-f7 border-shape-circle">
										<img :src="item.brand_icon">
									</i>
					          </div>
					          <div class="item-inner">
					            <div class="item-title">
									<div v-html="item.brand_name"></div>
									<!-- <div class="font-subtitle" v-html="item.brand_desc"></div>          	 -->
					            </div>
					            <div class="item-after">
					            	<a v-if="item.selected == 0" class="button active" @click="brandFollow(item, 1)">关注</a>
					            	<a v-if="item.selected != 0" class="button">已关注</a>
					            </div>
					          </div>
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
				selectedList: [],
				dataCacheName: 'app_cache_data_brands'
			}
		},
		created() {
			this.getBrands()
		},
		methods: {
			getHistoryData() {
				this.dataHandler(this.appUtil.getCache(this.dataCacheName))
			},
			getBrands() {
				var self = this
				this.appUtil.loginedInfo(({uid, area}) => {
					self.$ajax({
						data: {
							api: 'follow_brand_list',
							uid,
							area
						}
					}, function(data) {
						self.appUtil.putCache(self.dataCacheName, data)
						self.dataHandler(data)
					})
				})
			},
			dataHandler(list) {
				var selectedList = new Array()
				for(var i = 0; i < list.length; i++) {
					if(list[i].selected != 0) {
						selectedList.push(list[i])
					}
				}
				this.list = list
				this.selectedList = selectedList
			},
			brandFollow(b, addOrRemove) {
				var self = this
				this.appUtil.loginedInfo(({uid}) => {
					var api = ''
					switch(addOrRemove) {
						case 1:
							api = 'uid_brand_commit'
							break
						case 2:
							api = 'uid_brand_remove'
							break
					}
					self.$ajax({
						data: {
							api,
							uid,
							brand_id: b.brand_id
						},
						errorMsg: '选择品牌失败',
						showLoading: true
					}, (data) => {
						self.getBrands()
					})
				})
			}
		}
	}
</script>