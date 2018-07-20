<template>
	<div v-if="visibility" class="refresh-bg" @click="refresh()">
		<div class="bg-img">
			<img :src="img">
		</div>
		<div class="bg-label">
			{{label}}，点击屏幕重试
		</div>
	</div>
</template>

<script type="text/javascript">
	import {v, EVENTS} from '../core/vbus'
	export default {
		data() {
			return {
				img: require('../assets/nonetwork.jpg'),
				label: '网络不给力',
				visibility: false
			}
		},
		created() {
			var self = this
			v.$on(EVENTS.NETWORK_ERROR, (label) => {
				self.label = label
				self.visibility = true
			})
		},
		methods: {
			refresh() {
				window.location.reload()
			}
		}
	}
</script>