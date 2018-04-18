<template>
	<div class="list-block">
		<ul>
			<li v-for="(item, index) in users.list" @click="onSel(item)">
				<a class="item-link item-content">
					<div class="item-inner">
						<div class="item-title" v-html="item.title"></div>
						<div class="item-after" v-html="item.subtitle"></div>
					</div>
				</a>
			</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	import {mapState} from 'vuex'
	export default {
		data() {
			uname: this.userName,
			ident: this.identityNumber,
			list: new Array()
		},
		props: ['userName', 'identityNumber'],
		updated() {
			this.loadData()
		},
		methods: {
			loadData() {
				var that = this
				this.$store.dispatch('loadUserList', {
					uname: this.uname,
					ident: this.ident,
					callback: (data) => {
						that.list = data
					}
				})
			},
			onSel(item) {
				var that = this
				this.$store.dispatch('updateUsersSel', {
					user: item,
					callback: () => {
						that.$router.go(-1)
					}
				})
			}
		}
	}
</script>