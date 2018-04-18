<template>
	<div class="serv-pack-list">
		<div class="content-block-title" v-html="data.title"></div>
		<div class="list-block" :style="{height: data.height}">
			<ul>
				<li v-for="(item, index) in data.list" class="item-content" @click="click(item)">
					<div class="item-inner">
						<div class="item-title" v-html="item.title"></div>
						<div class="after" v-html="item.subtitle"></div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="less">
	.serv-pack-list {
		.list-block {
			overflow: scroll;
		}
	}
</style>

<script type="text/javascript">
	export default {
		data() {
			return {
				data: this.listConf
			}
		},
		props: {
			listConf: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		methods: {
			click(item) {
				if(this.data.selectEvent) {
					this.data.selectEvent(item)
				}
			}
		}
	}
</script>