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
	import {bus, EVENT} from '../common/bus'
	import {brows} from '../common/browsMap'

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
				bus.$emit(EVENT.SEL_BROW, '（#' + b.name + '）')
			}
		}
	}
</script>