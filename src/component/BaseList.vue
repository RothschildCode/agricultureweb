<template>
	<div class="page-content pull-to-refresh-content infinite-scroll base-list" ref="dom">
		<div class="pull-to-refresh-layer">
			<div class="preloader"></div>
			<div class="pull-to-refresh-arrow"></div>
		</div>
		<div v-if="!showhint" class="list-block media-list" style="margin-top: 0;">
			<list-item v-for="(item, index) in list" :data="item" :key="index"></list-item>
			<div v-if="list.length >= pageSize" class="infinite-scroll-preloader">
				<div class="preloader"></div>
			</div>
		</div>

		<div v-if="showhint" class="hint">
			<div class="hint-inner">
				<div class="hint-media">
					<img src="../assets/no-network.png">
				</div>
				<div class="hint-label">
					<p>网络请求失败,请检查您的网络</p>
					<p>拉下屏幕刷新。</p>
				</div>
			</div>
		</div>
	</div>
</template>


<script type="text/javascript">
	export default {
		data() {
			return {
				list: [],
				isbind: false,
				isloading: false,
				loadType: 1, //加载类型 1.下拉加载 2.滚动加载
				pageIndex: 1,
				pageSize: 15,
				showhint: false
			}
		},
		created() {
			this.getData()
		},
		updated() {
			var _this = this
			if(!this.isbind) {
				this.isbind = true
				var ptrContent = this.$$(this.$refs.dom)
				var _this = this
				ptrContent.on('refresh', function (e) {
					_this.pageIndex = 1
					_this.showhint = false
					_this.getData()
				});
				ptrContent.on('infinite', function () {
					if(_this.isloading) return
					_this.isloading = true
					_this.pageIndex += 1
					_this.getData()
				});       
			}
		},
		methods: {
			getData() {
				//overwrite method
			},
			loadDone(list) {
				if(this.pageIndex != 1) {
					var newlist = this.list.concat(list)
					this.list = newlist
					this.isloading = false
				}else {
					if(list.length > 0) {
						this.list = list
					}
					this.$f7.pullToRefreshDone()
				}
			},
			loadError(err) {
				this.$f7.pullToRefreshDone()
				this.loadDone(new Array())
				if(this.list.length <= 0) {
					this.showhint = true
				}
			}
		}
	}
</script>