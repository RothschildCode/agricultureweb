<template>
	<div class="page-content pull-to-refresh-content" ref="dom">
		<div class="pull-to-refresh-layer">
			<div class="preloader"></div>
			<div class="pull-to-refresh-arrow"></div>
		</div>
		<div class="list-block media-list">
			<list-item v-for="item in list" :data="item"></list-item>
			<div class="list-block-label">
				<p>Just pull page down to let the magic happen.</p>
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
				isbind: false
			}
		},
		created() {
			this.getData()
		},
		updated() {
			console.log('pull refresh updated')
			if(!this.isbind) {
				this.isbind = true
				var ptrContent = this.$$(this.$refs.dom)
				var _this = this
				ptrContent.on('refresh', function (e) {
					_this.getData()
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