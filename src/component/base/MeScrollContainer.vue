<template>
	<div class="mescroll" :id="'mescroll' + uniqueKey" style="height: -webkit-fill-available; overflow: scroll;">
		<div>
			<!-- <list-item v-for="(item, $index) in list" :data="item" :key="$index"></list-item> -->
			<content-wrap :data="data" :loaded="loaded"></content-wrap>
		</div>
	</div>
</template>

<script type="text/javascript">
	import MeSroll from 'mescroll'
	export default {
		props: ['uniqueKey', 'initload'],
		data() {
			return {
				data: [],
				pageIndex: 1,
				displayNumber: 15,
				mescroll: null
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
					var id = 'mescroll' + this.uniqueKey
					this.mescroll = new MeSroll(id, {
						down: {
							callback: this.downCallback
						},
						up: {
							callback: this.upCallback
						}
					})
				}
			},
			downCallback() {
				this.pageIndex = 1
				this.getListData()
			},
			upCallback(page) {
				this.pageIndex += 1
				this.getListData()
			},
			getListData(page) {
				this.mescroll.endSuccess(0, false)
			},
			getDone(isSucc, list) {
				if(isSucc) {
					this.mescroll.endSuccess(list.length, list.length < self.displayNumber ? false : true)
					this.data.list = this.pageIndex > 1 ? this.data.list.concat(list) : list
				}else {
					this.mescroll.endErr()
					this.pageIndex -= this.pageIndex > 1 ? 1 : 0
				}
			}
		},
		components: {
			ContentWrap: {}
		}
	}
</script>