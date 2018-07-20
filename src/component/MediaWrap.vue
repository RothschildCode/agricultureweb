<template>
	<div class="medias-wrap" :class="{'medias-block-wrap': block}">
		<!-- <img v-if="src != ''" v-for="(src, $index) in medias" :src="src" style="display:none;" @load="mediaLoaded($event, true, $index)" @error="mediaLoaded($event, false, $index)"> -->
		<img v-if="block && image != ''" v-for="(image, $index) in medias" :src="image" v-on:click.stop="preview($index)" @load="mediaLoaded($event, true, $index)" @error="mediaLoaded($event, false, $index)">
		<div v-if="!block && $index < 3" v-for="(sty, $index) in mediasData" class="medias-item" 
			:style="sty"
			:class="{'medias-one-pic': mediasData.length==1, 'medias-multi-pic': mediasData.length>1}" 
			v-on:click.stop="preview($index)">
			<img :src="sty.src" style="display: none;" @error="mediaLoaded($event, false, $index)">
		</div>
	</div>
</template>

<script type="text/javascript">
	import {v, EVENTS} from '../core/vbus'
	export default {
		props: ['medias', 'block', 'previewDisable'],
		data() {
			return {
				size: (document.body.clientWidth - 17 * 2) * 0.32,
				mediasData: [],
				loadedCount: 0,
				disable: this.previewDisable == true ? true : false
			}
		},
		created() {
			this.init()
		},
		watch: {
			medias(newVal, oldVal) {
				this.init()
			}
		},
		methods: {
			init() {
				var mediasData = new Array()
				for(var i = 0; i < this.medias.length; i++) {

					var width = this.size + 'px', 
						height = this.size + 'px', 
						src = this.medias[i],
						backgroundImage = 'url(' + src + ')'

					if(this.medias.length == 1) {
						mediasData.push({
							backgroundImage,
							src
						})
					}else {
						mediasData.push({
							width,
							height,
							backgroundImage,
							src
						})
					}
				}
				this.$set(this.$data, 'mediasData', mediasData)
			},
			preview(index) {
				if(!this.disable) {
					var myPhotoBrowserStandalone = this.$f7.photoBrowser({
					    photos : this.medias,
					    initialSlide: index,
					    theme: 'dark',
					    backLinkText: '关闭'
					})
					myPhotoBrowserStandalone.open()
				}
				this.$emit('itemTapEvent')
			},
			mediaLoaded(e, succ, inx) {
				this.loadedCount = this.loadedCount + 1
				if(!succ) {
					this.$set(this.medias, inx, require('../assets/img_load_err.jpg'))
					// $(e.currentTarget).attr('src', require('../assets/img_load_err.jpg'))
				}
				if(this.loadedCount == this.medias.length) {
					v.$emit(EVENTS.MEDIAS_LOADED)
				}
			}
		}
	}
</script>