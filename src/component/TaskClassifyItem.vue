<template>
	<li class="item-content">
		<div class="item-media"><i class="icon icon-f7"></i></div>
		<div class="item-inner">
			<div class="item-title" v-html="data.check_up_name">任务分类名称</div>
			<div class="item-after"></div>
		</div>
	</li>
</template>

<style lang="less">
	.item-content {
		background-color: #fff;
	}
</style>

<script type="text/javascript">
	export default {
		props: ['data'],
		methods: {
			click(data) {

			}
		}
	}
</script>