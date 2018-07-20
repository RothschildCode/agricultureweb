<template>
	<div class="floor">
		<div class="floor-wrap" @click="onclick">
			<div class="infos clearfix">
				<div class="avatar">
					<profile :src="authorheader"></profile>
				</div>
				<div class="author-time">
					<div class="author-icons clearfix">
						<span class="author" v-html="authorname"></span>
					</div>
					<span class="time" v-html="dateline"></span>
				</div>
			</div>
			<div class="item">
				<div class="title">
					<span style="-webkit-box-orient: vertical;" v-html="message"></span>
				</div>
			</div>
			<media-wrap v-if="img.length > 0 && img[0] != ''"
						:medias="img">
			</media-wrap>
		</div>
		<div class="row no-gutter card-footer">
			<div class="col-33 align-center">
				<span>{{cname}}</span>
			</div>
			<div class="col-33 align-center left-line right-line" @click="reply">
				<i class="f7-icons media">chat</i>
				评论{{comment_num}}
			</div>
			<div class="col-33 align-center">
				<span :style="{color: isPraise ? 'red' : ''}" @click="praise">
					<i class="f7-icons media" :class="{'praise-active': isPraise}">{{isPraise ? 'heart_fill' : 'heart'}}</i>赞{{praise_num}}
				</span>
			</div>
		</div>
	</div>		
</template>

<script type="text/javascript">
	import MediaWrap from './MediaWrap'
	import Profile from './Profile'
	export default {
		props: ['data'],
		data() {
			return {
				authorheader: this.data.authorheader,
				authorname: this.data.authorname,
				cname: this.data.cname,
				dateline: this.data.dateline,
				message: this.data.message,
				img: this.data.img,
				isPraise: false,
				praise_num: this.data.praise_num,
				comment_num: this.data.comment_num,
				pid: this.data.pid
			}
		},
		methods: {
			onclick() {
				window.location.href = './content.html?pid=' + this.pid + '&pageId=1&webview_transition'
			},
			reply() {
				if(this.appUtil.isLogin()) {
					// this.appUtil.putCache('editor_page_params', {
					// 	type: 2,
					// 	pId: this.data.pid
					// })
					// this.appUtil.applyNativeMethod('goPublish')
					window.location.href = './content.html?pid=' + this.pid + '&pageId=1&webview_transition&mcomments=1'
				}
			},
			praise() {
				if(!this.appUtil.isLogin(this)) {
					return
				}
				if(this.isPraise) {
					return
				}
				this.isPraise = true
				this.praise_num = parseInt(this.praise_num) + 1
				var self = this
				this.appUtil.loginedInfo(({uid}) => {
					self.$ajax({
						data: {
							api: 'post_num',
							pid: this.pid,
							stati: 'praise',
							uid
						}
					})
				})

			}
		},
		components: {
			MediaWrap,
			Profile
		}
	}
</script>