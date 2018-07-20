<template>
	<div class="floor cmment-item" @click="onreply">
		<div class="floor-wrap">
			<div class="infos clearfix">
				<div class="avatar">
					<profile :src="data.header"></profile>
				</div>
				<div class="author-time">
					<div class="author-icons">
						<a class="author" v-html="data.username"></a>
					</div>
					<div class="time">
						<!-- <span v-html="data.dateline"></span> -->
					</div>
				</div>
				<!-- <more-operation-btn :data="data"></more-operation-btn> -->
			</div>

			<div class="item">
				<span class="content" v-html="data.comment"></span>
				<div class="info">
					<span class="label-time" v-html="data.dateline"></span>
					<b class="btn-reply">回复</b>
				</div>
				<div v-if="replies.length > 0" class="reply-wrap">
					<ul>
						<li v-for="reply in replies" class="reply-item">
							<a class="user-name">{{reply.username}}</a>:
							<span class="reply-content" v-html="reply.content"></span>
						</li>
					</ul>
				</div>
			</div>

		</div>
	</div>		
</template>

<script type="text/javascript">
	import MoreOperationBtn from '../component/MoreOperationBtn'
	import Profile from './Profile'

	import {v, EVENTS} from '../core/vbus'

	export default {
		props: ['data'],
		data() {
			return {
				replies: []
			}
		},
		created() {
			this.getReplylist()
			var self = this
			v.$on(EVENTS.COMMENT_SUCC, (data) => {
				if(data.cid && data.cid == self.data.id) {
					self.getReplylist()
				}
			})		
		},
		methods: {
			dataHandler(list) {
				for(var i = 0; i < list.length; i++) {
					list[i].dateline = $.longToDate(list[i].dateline)
					list[i].content = $.parseRichText(list[i].content)
				}
				this.replies = list
			},
			getReplylist() {
				var self = this
				this.$ajax({
					data: {
						api: 'reply_list',
						cid: this.data.id
					}
				}, (data) => {
					self.dataHandler(data)
				})
			},
			onreply() {
				this.appUtil.openCommPopup({cid: this.data.id, name: this.data.username})
			}
		},
		components: {
			Profile,
			MoreOperationBtn
		}
	}
</script>