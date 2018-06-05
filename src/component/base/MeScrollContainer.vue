<template>
	<div class="mescroll" :id="ids.mescroll" style="height: -webkit-fill-available; overflow: scroll;">
		<div>
			<!-- <list-item v-for="(item, $index) in list" :data="item" :key="$index"></list-item> -->
			<content-wrap :data="data" :loaded="loaded"></content-wrap>
			<div :id="ids.emptyWrap"></div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: ['uniqueKey', 'initload','mescrollArr'],
		data() {
			return {
				data: {},
				pageSize: 15,
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
						// down: {
						// 	callback: this.downCallback
						// },
						up: {
							callback: this.upCallback,
							isBounce: false,
							empty: {
								icon: require("../../assets/mescroll-empty.png"), //图标,默认null
								tip: "暂无相关数据~", //提示
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
			getDone(isSucc, list, pageIndex) {
				if(isSucc) {
					this.mescroll.endSuccess(list.length, list.length >= this.displayNumber ? true : false)
					this.data.list = pageIndex > 1 ? data.list.concat(list) : list
				}else {
					this.mescroll.endErr()
					this.pageIndex -= pageIndex > 1 ? 1 : 0
				}
			}
		},
		components: {
			ContentWrap: {}
		}
	}
</script>