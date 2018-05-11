<template>
	<div class="news-page-view">
		<div v-for="item in list" class="floor" @click="click(item.pid)">
			<div class="infos clearfix">
				<div class="avatar">
					<img :src="item.cover">
				</div>
				<div class="author-time">
					<div class="author-icons clearfix">
						<span class="author" v-html="item.authorname"></span>
					</div>
					<span class="time" v-html="item.dateline"></span>
				</div>
			</div>
			<div class="item">
				<div class="title">
					<span style="-webkit-box-orient: vertical;" v-html="item.message"></span>
				</div>
			</div>
		</div>	
	</div>
</template>

<script type="text/javascript">
	export default {
		props: ['list'],
		updated() {
			var mySwiper1 = this.$f7.swiper('.swiper-1', {
			  pagination:'.swiper-1 .swiper-pagination',
			  spaceBetween: 50
			});
		},
		methods: {
			click(pid) {
				window.location.href = './newscontent.html?pid=' + pid + '&webview_transition'
			}
		}
	}
</script>