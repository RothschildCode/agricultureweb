<template>
	<div class="page navbar-fixed" data-page="price-list-page">
		<div class="navbar">
			<div class="navbar-inner">
				<div class="left">
					<a class="link show icon-only back">
						<i class="f7-icons">left</i>
					</a>
				</div>
				<div class="center">
					<span>套餐资费</span>
				</div>
				<div class="right">
					<a class="link show icon-only" @click="onSel()">
						完成
					</a>
				</div>
			</div>
		</div>

		<div class="page-content">
			<div class="list-block">
				<ul class="offer-spec-list">
					<li v-for="(item, index) in list" class="accordion-item" @click="click(item)">
						<a href="#" class="item-content item-link">
							<div v-if="offerSpec.offerSpecId == item.offerSpecId" class="item-media">
								<i class="icon f7-icons">check_round_fill</i>
							</div>
							<div class="item-inner">
								<div class="item-title" v-html="item.offerSpecName"></div>
							</div>
						</a>
						<div class="accordion-item-content">
							<div class="content-block">
								<p v-html="item.desc"></p>
							</div>
						</div>
					</li>					
				</ul>
			</div>	
		</div>

	</div>
</template>

<style lang="less">
	.offer-spec-list {
		.icon {
			color: #65d213;
			font-size: 1.2em;
		}
	}
</style>

<script type="text/javascript">
	import {mapState} from 'vuex'
	import {eventBus, event} from '../eventbus.js'
	export default {
		data() {
			return {
				list: [],
				partyId: '',
				category: '',
				offerSpec: {}
			}
		},
		created() {
			this.partyId = this.$route.query.partyId,
			this.category = this.$route.query.category
			this.loadData()
		},
		methods: {
			loadData() {
				var that = this
				this.$f7.showIndicator()
				this.$store.dispatch('loadOfferInitParam', (data) => {
					that.$store.dispatch('loadOfferPriceList', {
						condition: {
							partyId: that.partyId,
							category: that.category,
							categoryNodeId: data[0].E9_categoryNodeId
						},
						callback: (data) => {
							that.$f7.hideIndicator()
							that.list = data
						}
					})
				})
			},
			onSel() {
				eventBus.$emit(event.CHOICE_OFFER_SPEC, this.offerSpec)
				this.$f7.mainView.router.back()
			},
			click(item) {
				this.offerSpec = item
			}
		}
	}
</script>