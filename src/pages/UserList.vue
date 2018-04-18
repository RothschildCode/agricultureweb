<template>
	<div class="page navbar-fixed" data-page="list">
		<div class="navbar">
			<div class="navbar-inner">
				<div class="left">
					<a class="link show icon-only back">
						<i class="f7-icons">left</i>
					</a>
				</div>
				<div class="center">
					<span>用户查询</span>
				</div>
				<div class="right">
					<a class="link show icon-only back" @click="routeAddUser()">
						<i class="f7-icons">add</i>
					</a>
				</div>
			</div>
		</div>

		<div class="page-content">
			<div class="list-block">
				<ul>
					<li v-for="(item, index) in list">
						<a class="item-link item-content" @click="onSel(item)">
							<div class="item-inner">
								<div class="item-title" v-html="item.linkMan"></div>
								<div class="item-after" v-html="item.partyName"></div>
							</div>
						</a>
					</li>
				</ul>
			</div>	
		</div>

	</div>
</template>

<script type="text/javascript">
	import {mapState} from 'vuex'
	import {eventBus, event} from '../eventbus.js'
	export default {
		data() {
			return {
				condition: {},
				list: []
			}
		},
		created() {
			this.condition = {
				identifyType: this.$route.query.identifyType,
				selType: this.$route.query.selType,
				value: this.$route.query.value
			}
			this.loadData()
			var that = this
			this.$on(event.ADD_USER_SUCC, (data) => {
				that.loadData()
			})
		},
		methods: {
			loadData() {
				var that = this
				this.$f7.showIndicator()
				this.$store.dispatch('loadUserList', {
					condition: this.condition,
					callback: (data) => {
						that.$f7.hideIndicator()
						that.list = data
					}
				})
			},
			onSel(item) {
				eventBus.$emit(event.CHOICE_USER, item)
				this.$f7.mainView.router.back()
			},
			routeAddUser() {
				this.$f7.mainView.router.load({url: '/add/user/'})
			}
		}
	}
</script>