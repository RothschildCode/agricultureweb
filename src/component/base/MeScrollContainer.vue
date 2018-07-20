<template>
	<div class="mescroll" :id="ids.mescroll" style="height: -webkit-fill-available; overflow: scroll;">
		<div>
			<!-- <list-item v-for="(item, $index) in list" :data="item" :key="$index"></list-item> -->
			<content-wrap :data="data" :loaded="loaded" ref="contentWrap"></content-wrap>
			<div :id="ids.emptyWrap"></div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: ['uniqueKey', 'initload','mescrollArr', 'noDataTip', 'refreshBtnLabel', 'downlock', 'uplock'],
		data() {
			return {
				data: {
					list: []
				},
				pageSize: 10,
				mescroll: null,
				ids: {
					mescroll: 'mescroll' + this.uniqueKey,
					emptyWrap: 'empty-wrap' + this.uniqueKey
				}
			}
		},
		watch: {
			initload(curVal, oldVal) {
				if(curVal == true && !this.loaded) {
					this.init()
				}
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				if(this.initload == true && this.mescroll == null) {
					this.mescroll = new MeScroll(this.ids.mescroll, {
						down: {
							isLock: this.downlock
						},
						up: {
							isLock: this.uplock,
							callback: this.upCallback,
							isBounce: false,
							empty: {
								icon: require("../../assets/mescroll-empty.png"), //图标,默认null
								tip: this.noDataTip || "暂无相关数据~", //提示
								btntext: this.refreshBtnLabel || '',
								btnClick: this.refreshBtnLabel ? this.getListData : null
							},
							clearEmptyId: this.ids.emptyWrap
						}
					})
					if(this.mescrollArr) {
						this.mescrollArr.push(this.mescroll)
					}
				}
			},
			// downCallback() {
			// 	this.pageIndex += 1
			// 	this.getListData()
			// },
			upCallback(page) {
				this.getListData(page)
			},
			getDone(isSucc, list, pageIndex, options) {
				if(isSucc) {
					this.mescroll.endSuccess(list.length, list.length >= this.pageSize)
					// var newobj = JSON.parse(JSON.stringify(this.data))
					// newobj.list = pageIndex > 1 ? newobj.list.concat(list) : list
					// this.$set(this.data, 'list', pageIndex > 1 ? this.data.list.concat(list) : list)
					// this.data = newobj
					if(pageIndex > 1) {
						this.$set(this.data, 'list', this.data.list.concat(list))
					}else {
						this.$set(this.data, 'list', list)
					}
					//检查是否启用缓存
					if(options.cache == true) {
						this.appUtil.putCache(options.cacheKey, this.data.list)
					}
				}else {
					this.mescroll.endErr()
					// this.pageIndex -= pageIndex > 1 ? 1 : 0
				}
			}
		},
		components: {
			ContentWrap: {}
		}
	}
</script>