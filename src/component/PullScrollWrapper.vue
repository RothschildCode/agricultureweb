<template>
	<div class="pull-to-refresh-content infinite-scroll base-list" ref="dom">
		<div class="pull-to-refresh-layer">
			<div class="preloader"></div>
			<div class="pull-to-refresh-arrow"></div>
		</div>
		<div class="list-block media-list" style="margin-top: 0;">
			<!-- <list-item v-for="(item, index) in list" :data="item" :key="index"></list-item> -->
			<content-view :list="list"></content-view>
			<div v-if="list.length >= pageSize" class="infinite-scroll-preloader">
				<div class="preloader"></div>
			</div>
		</div>

		<div v-if="list.length <= 0" class="hint">
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
	import {eventbus, EVENTS} from '../js/bus'
	export default {
		props: ['list', 'defaultLoad', 'pageSize'],
		data() {
			return {
				isbind: false,
				isloading: false,
				loadType: 1, //加载类型 1.下拉加载 2.滚动加载
				pageIndex: 1,
				showhint: false
			}
		},
		created() {
			if(this.defaultLoad == true) {
				this.default()
			}
		},
		updated() {
			var _this = this
			if(this.ptrContent) {
				this.$f7.destroyPullToRefresh(this.ptrContent)
			}
			var ptrContent = this.$$(this.$refs.dom)

			var _this = this
			ptrContent.on('refresh', function (e) {
				_this.pageIndex = 1
				_this.showhint = false
				_this.load()
			});

			// //启用下拉刷新组件
			// this.$f7.destroyPullToRefresh(ptrContent)
			// this.$f7.initPullToRefresh(ptrContent)

			ptrContent.on('infinite', function () {
				if(_this.isloading) return
				_this.isloading = true
				_this.pageIndex += 1
				_this.load()
			});
			this.ptrContent = ptrContent
			this.$f7.initPullToRefresh(this.ptrContent)
		},
		methods: {
			default() {
				this.pageIndex = 1
				this.load()
			},
			load() {
				eventbus.$emit(EVENTS.PULL_SCROLL_LOAD, this.pageIndex)
			}
		}
	}
</script>