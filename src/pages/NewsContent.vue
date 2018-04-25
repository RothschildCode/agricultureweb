<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view"  main>
        <f7-pages>
			<div data-page="news-content" class="page toobar-fixed news-content-page" :class="{'bg-fill': comments.length < 1}">
				<div class="page-content">
					<div v-if="data" class="floor-list">
						<h2 class="subject" v-html="data.subject"></h2>
						<div class="floor master more">
							<div class="infos clearfix">
								<div class="avatar">
									<img :src="data.cover">
								</div>
								<div class="author-time">
									<div class="author-icons">
										<span class="author" v-html="data.username"></span>
									</div>
									<div class="time">
										<span v-html="data.dateline"></span>
									</div>
								</div>
								<div class="more-operation">
									<a class="more-operation-btn" @click="openPopover($event)"></a>
								</div>
							</div>
							<div class="item">
								<span class="title" v-html="data.message"></span>
							</div>
						</div>	

						<div class="floor-list">
							<div v-for="item in comments" class="floor more">
								<div class="infos clearfix">
									<div class="avatar">
										<img :src="item.cover">
									</div>
									<div class="author-time">
										<div class="author-icons">
											<span class="author" v-html="item.username"></span>
										</div>
										<div class="time">
											<span v-html="item.dateline"></span>
										</div>
									</div>
									<div class="more-operation">
										<a class="more-operation-btn" @click="openPopover($event, item.id)"></a>
									</div>									
								</div>
								<div class="item">
									<span class="content" v-html="item.comment"></span>
								</div>
							</div>					
						</div>

					</div>
				</div>
			</div>
        </f7-pages>
      </f7-view>
    </f7-views>

	<!-- Links popover -->
	<div class="popover popover-more">
		<div class="popover-inner">
			<div class="list-block">
				<ul>
					<li><a href="#" class="list-button item-link" @click="goReply">回复</a></li>
					<li><a href="#" class="list-button item-link">收藏</a></li>
					<li><a href="#" class="list-button item-link">举报</a></li>
				</ul>
			</div>
		</div>
	</div>

  </div>
</template>

<script>
	import {gethttp} from '../common/http'

	let http = gethttp({
		indicator: true
	})

	export default {
		data() {
			return {
				data: null,
				comments: [],
				pid: null,
				cid: null
			}
		},
		created() {
			this.pid = $.getUrlParam('pid')
			this.getContent()
			this.getComments()
		},
		methods: {
			openPopover(e, cid) {
				this.cid = cid
				this.$f7.popover('.popover-more', e.currentTarget);
			},
			getContent() {
				var _this = this
				http({
					data: {
						api: 'post_details',
						pid: this.pid
					},
					method: 'post'
				}).then((res) => {
					var d = res.data
					d.cover = 'http://peining.tunnel.echomod.cn/university/images/img_14347674602997.jpg'
					_this.data = d
				}).catch((err) => {

				})
			},
			getComments() {
				var _this = this
				http({
					data: {
						api: 'post_comment_list',
						pid: this.pid
					},
					method: 'post'
				}).then((res) => {
					var list = res.data
					for(var i = 0; i < list.length; i++) {
						list[i].cover = 'http://peining.tunnel.echomod.cn/university/images/img_14347674602997.jpg'
						list[i].comment = $.parseRichText(list[i].comment)
					}
					_this.comments = res.data
				}).catch((err) => {

				})
			},
			showActions() {
				var _this = this
				var buttons = [
				    {
				        text: '回复',
				        onClick: function() {
				        	_this.goReply()
				        }
				    },
				    {
				        text: '收藏'
				    },
				    {
				        text: '举报',
				    },
				    {
				        text: '取消',
				        color: 'red'
				    },
				];
				this.$f7.actions(buttons);		
			},
			goReply() {
				var url = 'reply.html?webview_transition&pid=' + this.pid
				if(this.cid) {
					url = url + '&cid=' + this.cid
				}
				window.location.href = url
			}
		}
	}
</script>