<template>
	<div class="brow-panel-wrapper">
		<div v-for="g in group" class="row">
			<div v-for="item in g" class="col-20 brow-item-wrapper" @click="sel(item)">
				<svg class="icon" aria-hidden="true">
					<use :xlink:href="item.link"></use>
				</svg>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	var brows = [
		{
			name: '闭嘴',
			link: '#icon-bizui'
		},
		{
			name: '鄙视',
			link: '#icon-bishi'
		},
		{
			name: '难受',
			link: '#icon-nanshou'
		},
		{
			name: '稚气',
			link: '#icon-zhiqi'
		},
		{
			name: '爱你',
			link: '#icon-aini'
		},
		{
			name: '鄙视',
			link: '#icon-bishi'
		},
		{
			name: '开心',
			link: '#icon-kaixin'
		},
		{
			name: '色',
			link: '#icon-se'
		},
		{
			name: '假笑',
			link: '#icon-jiaxiao'
		},
		{
			name: '可爱',
			link: '#icon-keai'
		},
		{
			name: '微笑',
			link: '#icon-weixiao'
		},
		{
			name: '尬笑',
			link: '#icon-gaxiao'
		},
		{
			name: '得意',
			link: '#icon-deyi'
		},
		{
			name: '糗大了',
			link: '#icon-xiudaliao'
		},
		{
			name: '难过',
			link: '#icon-nanguo'
		},
		{
			name: '不理你',
			link: '#icon-bulini'
		},
		{
			name: '愉快',
			link: '#icon-yukuai'
		},
		{
			name: '流汗',
			link: '#icon-liuhan'
		},
		{
			name: '大哭',
			link: '#icon-daku'
		},
		{
			name: '笑哭',
			link: '#icon-xiaoku'
		}
	]

	import {bus, EVENT} from '../common/bus'

	export default {
		data() {
			return {
				group: []
			}
		},
		created() {
			var group = new Array()
			for(var i = 0; i < brows.length; i++) {
				var inx = Math.floor(i / 5)
				if(!group[inx]) {
					group[inx] = new Array()
				}
				group[inx].push(brows[i])
			}
			this.group = group
		},
		methods: {
			sel(b) {
				bus.$emit(EVENT.SEL_BROW, b)
			}
		}
	}
</script>