<template>
	<div class="brow-panel-wrapper" ref="panel">
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
	import {eventbus, EVENTS} from '../js/bus'
	import {brows} from '../common/browsMap'

	export default {
		props: ['defaultClose'],
		data() {
			return {
				group: [],
				panel: null
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
		mounted() {
			this.panel = $(this.$refs.panel)
			if(this.defaultClose) {
				this.close()
			}
		},
		methods: {
			sel(b) {
				eventbus.$emit(EVENTS.SEL_BROW, '（#' + b.name + '）')
			},
			open() {
				this.panel.css({height: '11rem'})
			},
			close() {
				this.panel.css({height: '0'})
			}
		}
	}
</script>