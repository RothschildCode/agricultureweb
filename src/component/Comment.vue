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
				<div v-if="replylist.length > 0" class="reply-wrap">
					<ul>
						<li v-for="reply in replylist" class="reply-item">
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
				replylist: []
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
					_this.replylist = list
				})
			}
		},
		components: {
			MoreOperationBtn
		}
	}
</script>