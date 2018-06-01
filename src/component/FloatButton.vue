<template>
	<a href="#" class="floating-button color-pink" @click="onclick">
		<i class="f7-icons">add</i>
	</a>
</template>

<script type="text/javascript">
	export default {
		props: ['type', 'page'],
		methods: {
			onclick() {
				if(!app.isLogin(this)) return
				window.location.href = 'reply.html?webview_transition&type=' + this.type + '&pageid=' + this.page
			}
		}
	}
</script>