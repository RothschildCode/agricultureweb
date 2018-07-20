<template>
	<a href="#" class="floating-button" @click="onclick">
		发帖
	</a>
</template>

<script type="text/javascript">
	export default {
		props: ['type', 'page'],
		methods: {
			onclick() {
				if(this.appUtil.isLogin()) {
					// this.appUtil.putCache('editor_page_params', {
					// 	type: this.type,
					// 	pageId: this.page
					// })
					// this.appUtil.applyNativeMethod('goPublish')
					this.appUtil.putCache('channels_page_params', {
						type: this.type,
						pageId: this.page,
						target: 2
					})
					window.location.href = 'channels.html?webview_transition'
				}
			}
		}
	}
</script>