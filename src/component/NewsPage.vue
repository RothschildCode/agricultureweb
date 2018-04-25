<template>
	<div class="news-page-view">
		<div class="swiper-container swiper-1">
			<div class="swiper-pagination"></div>
			<div class="swiper-wrapper">
				<div class="swiper-slide" style="background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524580693117&di=214bf80adf17334bede9130fc79c0fa8&imgtype=0&src=http%3A%2F%2Fwww.amic.agri.gov.cn%2Fnxtwebfreamwork%2Fupload%2F20120314151905740.JPG)"><span></span></div>
				<div class="swiper-slide" style="background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524580886888&di=3be37344cc3046a45dbe084270ac5e66&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F8b82b9014a90f6038101a0553312b31bb051ed6b.jpg)"><span></span></div>
				<div class="swiper-slide" style="background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524580922578&di=6645b9fe9805080873f5e6f45705bc3c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fd439b6003af33a87f452030ecc5c10385343b5e2.jpg)"><span></span></div>
			</div>
		</div>

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
					<span v-html="item.message"></span>
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