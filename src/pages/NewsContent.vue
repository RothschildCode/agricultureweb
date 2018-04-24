<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view"  main>
        <f7-pages>
			<div data-page="news-content" class="page toobar-fixed news-content-page" :class="{'bg-fill': comments.length < 1}">
				<div class="page-content">
					<div v-if="data" class="bg-fill author-content-wrapper">
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
						                        <div class="item-after" @click="openPopover($event)">
						                        	<i class="f7-icons">more_fill</i>
						                        </div>
						                    </div>
						                    <div class="item-subtitle" v-html="data.dateline"></div>
						                </div>
						            </div>								
								</div>
							</div>
						</div>
						<div class="content" v-html="data.message"></div>						
					</div>

					<div class="bg-fill comment-list-wrapper">
						<div v-for="item in comments" class="comment-item">
							<div class="card">
								<div class="card-header">
									<div class="list-block media-list">
							            <div class="item-content">
							                <div class="item-media">
							                    <img class="news-cover" :src="item.cover">
							                </div>
							                <div class="item-inner">
							                    <div class="item-title-row">
							                        <div class="item-title" v-html="item.username"></div>
							                        <div class="item-after" @click="openPopover($event, item.id)">
							                        	<i class="f7-icons">more_fill</i>
							                        </div>
							                    </div>
							                    <div class="item-subtitle" v-html="item.dateline"></div>
							                </div>
							            </div>
									</div>
								</div>
							</div>
							<div class="content" v-html="item.comment"></div>						
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