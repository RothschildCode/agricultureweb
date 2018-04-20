<template>
	<div class="page-content pull-to-refresh-content infinite-scroll" ref="dom">
		<div class="pull-to-refresh-layer">
			<div class="preloader"></div>
			<div class="pull-to-refresh-arrow"></div>
		</div>
		<div class="list-block media-list">
			<list-item v-for="item in list" :data="item"></list-item>
			<div class="infinite-scroll-preloader">
				<div class="preloader"></div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">

	import {eventbus} from '../common/e'

	export default {
		data() {
			return {
				list: [],
				isbind: false,
				isloading: false
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
					_this.getData(false)
				});
				dom.on('infinite', function () {
					_this.getData(true)
				});       
			}
		},
		methods: {
			getData() {
				//overwrite method
			}
		}
	}
</script>