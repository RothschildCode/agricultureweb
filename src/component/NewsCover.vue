<template>
	<div class="list-block media-list">
	    <div class="item-content">
	        <div class="item-media">
	            <img class="news-cover" :src="cover">
	        </div>
	        <div class="item-inner">
	            <div class="item-title-row">
	                <div class="item-title" v-html="name"></div>
	            </div>
	            <div class="item-subtitle" v-html="time"></div>
	        </div>
	    </div>								
	</div>
</template>

<script type="text/javascript">
	export default {
		props: ['cover', 'name', 'time']
	}
</script>