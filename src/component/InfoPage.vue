<template>
	<div class="news-page-view">
		<div>
			<div v-for="item in list" class="info-item">
				<div class="info-wrap" :class="{horizontal:item.images && item.images.length < 3, vertical: item.images && item.images.length >= 3}">
					<div class="info-inner">
						<div class="info-link">
							<div>
								<div v-if="item.images && item.images.length < 3 && item.images.length > 0" class="info-images">
									<div class="image-inner">
										<img :src="item.images[0]">
									</div>
								</div>
								<div class="info-title">
									<div class="title-inner" >摄影师爆料马苏死命在戛纳红毯足足待了6分钟，怎么赶都不走</div>
								</div>
								<div v-if="item.images && item.images.length >= 3" class="info-images">
									<div v-for="img in item.images" class="image-item">
										<div class="image-item-inner">
											<img :src="img">
										</div>
									</div>
								</div>									
								<div class="info-other">
									<span>双子娱类</span>
									<span>4944评</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>		

		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: ['list'],
		methods: {
			click(pid) {
				
			}
		}
	}
</script>