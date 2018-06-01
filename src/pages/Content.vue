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
							<div class="floor-wrap">
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
										<a class="more-operation-btn f7-icons fontsize-2x" @click="openPopover($event)">more</a>
									</div>
								</div>
								<div class="item">
									<span class="title" v-html="data.message"></span>
								</div>

								<media-wrap :medias="data.img" :block="true"></media-wrap>

							</div>
						</div>

						<div class="floor-list">
							<comment v-for="(item, $index) in comments" :data="item" :key="$index"></comment>				
						</div>

					</div>
				</div>

				<common-footer-nav :external="external"></common-footer-nav>

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
<!-- 					<li><a href="#" class="list-button item-link">收藏</a></li>
					<li><a href="#" class="list-button item-link">举报</a></li> -->
				</ul>
			</div>
		</div>
	</div>

	<common-editor-popup :pid="data.pid" :comm="comm"></common-editor-popup>

  </div>
</template>

<script>
	import MediaWrap from '../component/MediaWrap'
	import Comment from '../component/Comment'
	import CommonFooterNav from '../component/CommonFooterNav'
	import CommonEditorPopup from '../component/CommonEditorPopup'
	import {gethttp} from '../common/http'
	import {eventbus, EVENTS} from '../js/bus'

	let http = gethttp({
		indicator: true
	})

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
				comm: null
			}
		},
		created() {
			var self = this
			eventbus.$on(EVENTS.MORE_OPERATION_TAP, function(c){
				self.openPopover(c.e, c.data.id)
			})
			eventbus.$on(EVENTS.COMMENT_SUCC, () => {
				self.getComments()
			})
			this.pid = $.getUrlParam('pid')
			this.getContent()
			this.getComments()
		},
		methods: {
			openCommPopup() {
				this.external = true
			},
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
					var d = res.data.data
					d.cover = 'http://39.107.99.122/university/images/img_14347674602997.jpg'
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
					var list = res.data.data
					for(var i = 0; i < list.length; i++) {
						list[i].cover = 'http://39.107.99.122/university/images/img_14347674602997.jpg'
						list[i].comment = $.parseRichText(list[i].comment)
					}
					_this.comments = list
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
				    }
				];
				this.$f7.actions(buttons)
			},
			goReply() {
				if(!app.isLogin(this)) return
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
			CommonEditorPopup
		}
	}
</script>