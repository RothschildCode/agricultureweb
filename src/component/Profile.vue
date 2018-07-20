<template>
	<img :src="src || require('../assets/profile.png')" @load="loaded(true)" @error="loaded(false)">
</template>

<script type="text/javascript">
	export default {
		props: ['src'],
		methods: {
			loaded(succ) {
				if(!succ) {
					this.authorheader = require('../assets/profile.png')
				}
			}
		}
	}
</script>