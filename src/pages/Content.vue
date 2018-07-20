<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view"  main>
        <f7-pages>
			<div data-page="news-content" class="page toobar-fixed news-content-page">
				<div class="page-content">
					<div v-if="data" class="floor-list">
						<h2 class="subject" v-html="data.subject"></h2>
						<div class="floor master more">
							<div class="floor-wrap">
								<div class="infos clearfix">
									<div class="avatar"> 
										<profile :src="data.header"></profile>
									</div>
									<div class="author-time">
										<div class="author-icons">
											<span class="author" v-html="data.username"></span>
										</div>
										<div class="time">
											<span v-html="data.dateline"></span>
										</div>
									</div>
<!-- 									<div class="more-operation">
										<a class="more-operation-btn f7-icons fontsize-2x" @click="openPopover($event)">more</a>
									</div> -->
								</div>
								<div class="item">
									<span class="title" v-html="data.message"></span>
								</div>

								<media-wrap v-if="pageId == 1" :medias="data.img" :block="true"></media-wrap>

							</div>
						</div>

					</div>

					<div class="tabs-row">
						<div class="buttons-row">
							<a id="mcomments" href="#mcomments" class="button tab-link active">评论  {{comments.length}}</a>
						</div>
					</div>

					<div class="floor-list">
						<comment v-if="comments.length > 0" v-for="(item, $index) in comments" :data="item" :key="$index"></comment>
						<div v-if="comments.length < 1" style="width: 100%; padding: 2em 0; text-align: center;">
							<span style="">暂无评论，抢沙发~</span>
						</div>
					</div>

				</div>

				<common-footer-nav :pid="pid"></common-footer-nav>

			</div>

        </f7-pages>
      </f7-view>
    </f7-views>

	<common-editor-popup></common-editor-popup>

	<refresh-background></refresh-background>

  </div>
</template>

<script>
	import MediaWrap from '../component/MediaWrap'
	import Comment from '../component/Comment'
	import CommonFooterNav from '../component/CommonFooterNav'
	import CommonEditorPopup from '../component/CommonEditorPopup'
	import Profile from '../component/Profile'
	import RefreshBackground from '../component/RefreshBackground'
	import {v, EVENTS} from '../core/vbus'

	export default {
		data() {
			return {
				data: {
					img: []
				},
				comments: [],
				pid: null,
				cid: null,
				external: true,
				comm: null,
				mcomments: null,
				pageId: 1
			}
		},
		created() {
			var self = this
			v.$on(EVENTS.COMMENT_SUCC, (data) => {
				if(!data.cid) {
					self.getComments()
				}
			})
			v.$on(EVENTS.MEDIAS_LOADED, () => {
				// alert(1)
				if(self.mcomments) {
					self.scrollCommentsArea()
				}
			})
			this.pid = $.getUrlParam('pid')
			this.mcomments = $.getUrlParam('mcomments')
			this.pageId = $.getUrlParam('pageId')
			this.getContent()
			this.getComments()
		},
		methods: {
			scrollCommentsArea() {
				console.log($('#mcomments').offset().top)
				if(this.mcomments) {
					//滑动到评论区
					$('.page-content').animate({scrollTop: $('#mcomments').offset().top}, 500)
				}
			},
			openCommPopup() {
				this.external = true
			},
			openPopover(e, cid) {
				this.cid = cid
				this.$f7.popover('.popover-more', e.currentTarget);
			},
			getContent() {
				var self = this
				this.$ajax({
					data: {
						api: 'post_details',
						pid: this.pid
					},
					pageRefresh: true
				}, (data) => {
					data.dateline = $.longToDate(data.dateline)
					self.data = data
				})
			},
			getComments() {
				var self= this
				this.$ajax({
					data: {
						api: 'post_comment_list',
						pid: this.pid
					},
					errorMsg: '获取评论列表失败:('
				}, (data) => {
					var list = data
					for(var i = 0; i < list.length; i++) {
						list[i].dateline = $.longToDate(list[i].dateline)
						list[i].comment = $.parseRichText(list[i].comment)
					}
					self.comments = list
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
				    }
				];
				this.$f7.actions(buttons)
			},
			goReply() {
				if(!this.appUtil.isLogin()) return
				var url = 'reply.html?webview_transition&type=2&pid=' + this.pid
				if(this.cid) {
					url = url + '&cid=' + this.cid
				}
				window.location.href = url
			}
		},
		components: {
			MediaWrap,
			Comment,
			CommonFooterNav,
			CommonEditorPopup,
			Profile,
			RefreshBackground
		}
	}
</script>