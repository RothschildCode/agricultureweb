<template>
	<div class="toolbar tabbar">
	    <div class="toolbar-inner">
	        <a v-for="(item, index) in list" class="tab-link" :class="{active:step > item.step}">
	            <i v-if="step > item.step" class="f7-icons">check_round_fill</i>
	            <i v-if="step == item.step" class="f7-icons">compose</i>
	            <span class="tabbar-label" v-html="item.label"></span>
	        </a>
	    </div>
	</div>
</template>

<style lang="less">
	.toolbar {
		.toolbar-inner {
			padding: 0;
			.tab-link.filled {
				color: #4cd964;
			}
		}
		height: 70px;
		.f7-icons {
			margin-bottom: 6px;
		}
	}
</style>

<style lang="less">
	.business-process-bar {
		.button {
			padding: 0;
			border: none;
			border-radius: 0 !important;
			background: orange;
			color: white;
		}
		.button.active {
			background: #4cd964;
		}
	}
</style>

<script type="text/javascript">
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				list: [
					{
						label: '用户信息',
						step: 1
					},
					{
						label: '套餐选择',
						step: 2
					},
					{
						label: '信息填写',
						step: 3
					},
					{
						label: '信息确认',
						step: 4
					}
				]
			}
		},
		props: ['step'],
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