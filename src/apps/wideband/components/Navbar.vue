<template>
	<div class="navbar">
		<div class="navbar-inner">
			<div class="left">
				<a class="link" 
						@click="prev()"
						:class="{show: wideband.bstep > 1}"><i class="f7-icons">chevron_left</i>上一步</a>
			</div>
			<div class="center">
			<span v-html="titleLabel"></span>
			</div>
			<div class="right">
				<a class="link"
						@click="next()"
						:class="{show: wideband.bstep < 4}">下一步<i class="f7-icons">chevron_right</i></a>
			</div>
		</div>
	</div>
</template>

<style lang="less">
	.navbar {
		.link {
			visibility: hidden;
			font-size: .8em;
			color: #fff;
		}
		.link.show {
			visibility: visible;
		}
	}
</style>

<script type="text/javascript">
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				titleLabel: this.title
			}
		},
	    computed: {
	      ...mapState({
	        wideband: state => state.wideband
	      })
	    },
		props: {
			title: {
				type: String,
				default() {
					return '标题'
				}
			}
		},
		methods: {
			prev() {
				this.$store.dispatch('setWidebandStep', {
					dir: false
				})
			},
			next() {
				this.$store.dispatch('setWidebandStep', {
					dir: true
				})
			}
		}
	}

</script>