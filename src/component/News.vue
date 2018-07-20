<template>
	<div class="news-item" @click="onclick">
		<a class="news-link clearfix">
			<div class="news-detail" :class="{desc: data.img.length < 3 && data.img[0] != ''}">
				<h3 class="title" v-html="data.subject"></h3>
				<media-wrap v-if="data.img.length > 2"
							:previewDisable="true"
							v-on:itemTapEvent="onclick"
							:medias="data.img">
				</media-wrap>
				<div class="news-info">
					<div>
						<span v-html="data.cname"></span>
						<span>{{data.comment_num}}评</span>
					</div>
				</div>
			</div>
			<div v-if="data.img.length < 3 && data.img[0] != '' && $index == 0" v-for="(img, $index) in data.img" class="news-img-holder" :style="{backgroundImage: 'url('+img+')'}">
			</div>
		</a>
	</div>	
</template>

<script type="text/javascript">
	import MediaWrap from '../component/MediaWrap'
	export default {
		props: ['data'],
		methods: {
			onclick() {
				window.location.href = './content.html?pid=' + this.data.pid + '&pageId=2&webview_transition'
			}
		},
		components: {
			MediaWrap
		}
	}
</script>