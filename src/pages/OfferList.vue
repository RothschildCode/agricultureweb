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
					<span>套餐</span>
				</div>
				<div class="right">
					
				</div>
			</div>
		</div>
		<div class="page-content">
			<div class="list-block">
				<ul>
					<li v-for="(item, index) in list">
						<a class="item-link item-content" @click="onSel(item)">
							<div class="item-inner">
								<div class="item-title" v-html="item.offername"></div>
								<!-- <div class="item-after" v-html="item.partyName"></div> -->
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
				list: [],
				partyId: ''
			}
		},
		created() {
			this.partyId = this.$route.query.partyId
			this.loadData()
		},
		methods: {
			loadData() {
				var that = this
				this.$f7.showIndicator()
				this.$store.dispatch('loadOfferInitParam', (data) => {
					that.$store.dispatch('loadOfferList', {
						partyId: that.partyId,
						categoryNodeId: data[0].E9_categoryNodeId,
						callback: (data) => {
							that.$f7.hideIndicator()
							that.list = data
						}
					})
				})
			},
			onSel(item) {
				eventBus.$emit(event.CHOICE_OFFER, item)
				this.$f7.mainView.router.back()
			}
		}
	}
</script>