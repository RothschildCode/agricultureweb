<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view"  main>
		<subnavbar :list="subnavbarItems" :cid="cid"></subnavbar>
        <f7-pages>
			<div data-page="news" class="page news-page navbar-through">		
				<a href="#" class="floating-button color-pink" @click="goPublish">
					<i class="f7-icons">add</i>
				</a>
				<div class="page-content pull-to-refresh-content infinite-scroll" data-distance="10" ref="pageContent">
					<div class="pull-to-refresh-layer">
						<div class="preloader"></div>
						<div class="pull-to-refresh-arrow"></div>
					</div>
					<!-- data list render begin -->
					<div v-for="item in list" class="info-item" @click="newsClick(item)">
						<div class="info-wrap" :class="{horizontal:item.img && item.img.length < 3, vertical: item.img && item.img.length >= 3}">
							<div class="info-inner">
								<div class="info-link">
									<div>
										<div v-if="item.img && item.img.length < 3 && item.img.length > 0" class="info-images">
											<div class="image-inner">
												<img :src="item.img[0]">
											</div>
										</div>
										<div class="info-title">
											<div class="title-inner" v-html="item.subject"></div>
										</div>
										<div v-if="item.img && item.img.length >= 3" class="info-images">
											<div v-for="image in item.img" class="image-item">
												<div class="image-item-inner">
													<img :src="image">
												</div>
											</div>
										</div>									
										<div class="info-other">
											<span v-html="item.cname">双子娱类</span>
											<span>{{item.comment_num}}评</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					<div v-if="list.length >= pageSize" class="infinite-scroll-preloader">
						<div class="preloader"></div>
					</div>

				</div>

			</div>
        </f7-pages>
      </f7-view>
    </f7-views>
  </div>
</template>

<script>
	import Subnavbar from '../component/Subnavbar'
	import {eventbus, EVENTS} from '../js/bus'
	import {http} from '../common/http'

	export default {
		data() {
			return {
				list: [],
				subnavbarItems: [],
				currentSubnav: {},
				pageIndex: 1,
				pageSize: 15,
				pageId: 2,
				cid: null,
				f7CompInit: false,
				loading: false
			}
		},
		updated() {
			if(!this.f7CompInit) {
				this.f7CompInit = true
				var _this = this
				var ptrContent = this.$$(this.$refs.pageContent)
				ptrContent.on('refresh', function (e) {
					// if(_this.loading) return
					_this.refresh()
				});	
				ptrContent.on('infinite', function () {
					if(_this.loading) return
					_this.load()
				});							
			}
		},
		created() {
			eventbus.$on(EVENTS.PULL_SCROLL_LOAD, this.pullScrollLoading)
			eventbus.$on(EVENTS.SUBNAV_ITEM_TAP, this.subnavItemClick)
			this.cid = $.getUrlParam('cid')
			this.getSubnavbars()
			this.loadNews()
		},
		methods: {
			refresh() {
				this.pageIndex = 1
				this.loadNews(1)
			},
			load() {
				this.pageIndex += 1
				this.loadNews()
			},
			goPublish() {
				window.location.href = 'reply.html?webview_transition&type=1&pageid=' + this.pageId
			},
			getSubnavbars() {

				if(this.cid && this.cid != '') {
					this.subnavbarItems = app.get('subnavbar_info')
					return
				}

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
					app.set('subnavbar_info', list)
					_this.subnavbarItems = list
					_this.refresh()
				})
			},
			subnavItemClick(data) {
				var url = 'info.html'
				if(data) {
					url += '?cid=' + data.cid
				}
				window.location.href = url
			},
			loadNews() {
				if(this.pageIndex > 1) {
					this.loading = true
				}
				var data = {
					api: 'college_post_list',
					displayNumber: this.pageSize,
					pageIndex: this.pageIndex,
					fid: 2,
					pageid: this.pageId
				}
				if(this.cid && this.cid != '') {
					data.cid = this.cid
				}

				var _this = this
				this.loading = true
				http({
					data,
					method: 'post'
				}).then((res) => {
					var list = res.data.data
					for(var i = 0; i < list.length; i++) {
						list[i].cover = 'http://39.107.99.122/university/images/img_14347674602997.jpg'
						list[i].message = $.parseRichText(list[i].message)
					}
					if(this.pageIndex > 1) {
						if(list.length > 0) {
							var newlist = _this.list.concat(list)
							_this.list = newlist
						}else {
							_this.pageIndex -= 1
						}
					}else {
						_this.list = list
					}

					if(this.pageIndex == 1) {
						_this.$f7.pullToRefreshDone()
					}
					this.loading = false
				}).catch((err) => {
					// _this.loadError(err)
				})
			},
			pullScrollLoading(pageIndex) {
				this.loadNews(pageIndex)
			},
			newsClick(data) {
				window.location.href = './newscontent.html?pid=' + data.pid + '&webview_transition'
			},
			goReply(data) {
				window.location.href = 'reply.html?webview_transition&type=2&pid='+data.pid
			}			
		},
		components: {
			Subnavbar
		}
	}
</script>