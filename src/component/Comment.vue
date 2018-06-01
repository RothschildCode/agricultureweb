<template>
	<div class="floor more">
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
				<more-operation-btn :data="data"></more-operation-btn>
			</div>

			<div class="item">
				<span class="content" v-html="data.comment"></span>
				<div class="info">
					<span class="label-time">1小时前</span>
					<b class="btn-reply" @click="onreply">回复</b>
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
	import {http} from '../common/http'
	export default {
		props: ['data'],
		data() {
			return {
				replies: []
			}
		},
		created() {
			this.getReplylist()
		},
		methods: {
			getReplylist() {
				var _this = this
				http({
					data: {
						api: 'reply_list',
						cid: this.data.id
					},
					method: 'post'
				}).then((res) => {
					var list = res.data.data
					for(var i = 0; i < list.length; i++) {
						list[i].content = $.parseRichText(list[i].content)
					}
					_this.replies = list
				})
			},
			onreply() {
				app.openCommPopup({cid: this.data.cid, name: this.data.username})
			}
		},
		components: {
			MoreOperationBtn
		}
	}
</script>