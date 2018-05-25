<template>
	<div class="floor">
		<div class="floor-wrap" @click="onclick">
			<div class="infos clearfix">
				<div class="avatar">
					<img :src="data.cover">
				</div>
				<div class="author-time">
					<div class="author-icons clearfix">
						<span class="author" v-html="data.authorname"></span>
					</div>
					<span class="time" v-html="data.dateline"></span>
				</div>
			</div>
			<div class="item">
				<div class="title">
					<span style="-webkit-box-orient: vertical;" v-html="data.message"></span>
				</div>
			</div>
			<media-wrap :medias="data.img"></media-wrap>
		</div>
		<div class="row no-gutter card-footer">
			<div class="col-33 align-center">
				<span>{{data.cname}}</span>
			</div>
			<div class="col-33 align-center left-line right-line" @click="reply">
				<i class="f7-icons media">chat</i>
				{{data.comment_num}}
			</div>
			<div class="col-33 align-center">
				<span :style="{color: data.isPraise ? 'red' : ''}">
					<i class="f7-icons media" :style="{color: data.isPraise ? 'red' : ''}" @click="praise">{{data.isPraise ? 'heart_fill' : 'heart'}}</i>
					{{data.praise_num}}
				</span>
			</div>
		</div>
	</div>		
</template>

<script type="text/javascript">
	import MediaWrap from './MediaWrap'
	import {http} from '../common/http'
	export default {
		props: ['data'],
		created() {
			this.data.isPraise = false
		},
		methods: {
			onclick() {
				window.location.href = './content.html?pid=' + this.data.pid + '&webview_transition'
			},
			reply() {
				window.location.href = 'reply.html?webview_transition&type=2&pid=' + this.data.pid
			},
			praise() {
				if(this.data.isPraise) return
				this.data.isPraise = true
				this.data.praise_num = parseInt(this.data.praise_num) + 1
				http({
					data: {
						api: 'post_num',
						pid: this.data.pid,
						stati: 'praise'
					},
					method: 'post'
				}).then((res) => {
					// alert(res.data)
				})
			}
		},
		components: {
			MediaWrap
		}
	}
</script>