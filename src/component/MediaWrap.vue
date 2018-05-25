<template>
	<div class="medias-wrap" :class="{'medias-block-wrap': block}">
		<img v-if="block" v-for="(image, $index) in medias" :src="image" v-on:click.stop="preview($index)">
		<div v-if="!block && $index < 3" v-for="(sty, $index) in mediasData" :style="sty" class="medias-item" :class="{'medias-one-pic': mediasData.length==1, 'medias-multi-pic': mediasData.length>1}" v-on:click.stop="preview($index)"></div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: ['medias', 'block'],
		data() {
			return {
				size: (document.body.clientWidth - 17 * 2) * 0.32,
				mediasData: []
			}
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				var mediasData = new Array()
				for(var i = 0; i < this.medias.length; i++) {
					var w = this.size + 'px', h = this.size + 'px', bg = 'url(' + this.medias[i] + ')'
					if(this.medias.length == 1) {
						mediasData.push({
							backgroundImage: bg
						})
					}else {
						mediasData.push({
							width: w,
							height: h, 
							backgroundImage: bg
						})
					}
				}
				this.mediasData = mediasData
			},
			preview(index) {
				var myPhotoBrowserStandalone = this.$f7.photoBrowser({
				    photos : this.medias,
				    initialSlide: index,
				    theme: 'dark',
				    backLinkText: '关闭'
				})
				myPhotoBrowserStandalone.open()
			}
		}
	}
</script>