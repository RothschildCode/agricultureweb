<template>
	<div class="card">
		<div class="card-header">
			<div class="list-block media-list">
	            <div class="item-content">
	                <div class="item-media">
	                    <img class="news-cover" :src="data.cover">
	                </div>
	                <div class="item-inner">
	                    <div class="item-title-row">
	                        <div class="item-title" v-html="data.authorname"></div>
	                    </div>
	                    <div class="item-subtitle" v-html="data.dateline"></div>
	                </div>
	            </div>								
			</div>
		</div>
		<div class="card-content">
			<div class="card-content-inner">
				<p class="news-title" v-html="data.subtitle"></p>
				<p class="news-message" v-html="data.message"></p>
			</div>
		</div>
		<div class="card-footer">
			<a v-html="data.cname"></a>
		</div>
	</div>	
</template>

<script type="text/javascript">
	export default {
		props: ['data'],
		methods: {
			click(data) {

			}
		}
	}
</script>