<template>
	<div class="card" @click="click(data.pid)">
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
			<div>
				<i class="icon iconfont icon-ziyuan2">
					<span v-html="data.browse_num"></span>
				</i>
			</div>
			<div>
				<i class="icon iconfont icon-ziyuan1">
					<span v-html="data.comment_num"></span>
				</i>
			</div>
			<div>
				<i class="icon iconfont icon-ziyuan">
					<span v-html="data.praise_num"></span>
				</i>
			</div>
		</div>
	</div>	
</template>

<script type="text/javascript">
	export default {
		props: ['data'],
		methods: {
			click(pid) {
				window.location.href = './newscontent.html?pid=' + pid + '&webview_transition'
			}
		}
	}
</script>