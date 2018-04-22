<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view"  main>
        <f7-pages>
			<div data-page="news-content" class="page navbar-fixed toobar-fixed news-content-page">
				<div class="page-content">
					<h2 class="subject" v-html="data.subject"></h2>
					<div class="card">
						<div class="card-header">
							<div class="list-block media-list">
					            <div class="item-content">
					                <div class="item-media">
					                    <img class="news-cover" :src="data.cover">
					                </div>
					                <div class="item-inner">
					                    <div class="item-title-row">
					                        <div class="item-title" v-html="data.username"></div>
					                        <div class="item-after">
					                        	<i class="f7-icons">more_fill</i>
					                        </div>
					                    </div>
					                    <div class="item-subtitle" v-html="data.dateline"></div>
					                </div>
					            </div>								
							</div>
						</div>
					</div>
					<p class="content" v-html="data.message"></p>
				</div>
			</div>
        </f7-pages>
      </f7-view>
    </f7-views>
  </div>
</template>

<style lang="less">
	.news-content-page {
		.page-content {
			background: #fff;
		}
		.subject {
			padding: 0 1em;
		}
		.card-header:after {
			padding: 1em;
			display: none;
		}
		.content {
			padding: 0 1em;
			font-size: 1.2em;
		}
	}
</style>

<script>
	import {getHttp} from '../common/http'
	export default {
		data() {
			return {
				data: {}
			}
		},
		created() {
			this.getContent()
		},
		methods: {
			getContent() {
				var pid = $.getUrlParam('pid')
				var _this = this
				getHttp()({
					data: {
						api: 'post_details',
						pid
					},
					method: 'post'
				}).then((res) => {
					var d = res.data
					d.cover = 'http://peining.tunnel.echomod.cn/university/images/img_14347674602997.jpg'
					_this.data = d
				}).catch((err) => {

				})
			}
		}
	}
</script>