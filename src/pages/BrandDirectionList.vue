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
					<span>局向查询</span>
				</div>
				<div class="right"></div>
			</div>
		</div>

		<div class="page-content">
			<form data-search-list=".list-block-search" data-search-in=".item-title" class="searchbar searchbar-init">
				<div class="searchbar-input">
				  <input v-model="keyword" type="search" placeholder="请输入关键字">
				  <a href="#" class="searchbar-clear"></a>
				</div>
				<a class="searchbar-cancel" @click="loadData()">查询</a>
			</form>
			<div class="list-block">
				<ul>
					<li v-for="(item, index) in list">
						<a class="item-link item-content" @click="onSel(item)">
							<div class="item-inner">
								<div class="item-title" v-html="item.tmlName"></div>
								<!-- <div class="item-after" v-html="item.rankName"></div> -->
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
				keyword: null,
				list: [],
				sel: null
			}
		},
		methods: {
			loadData() {
				var that = this
				this.$store.dispatch('loadBrandDirectionList', {
					keyword: this.keyword,
					callback: (data) => {
						console.log(data)
						that.list = data
					}
				})
			},
			onSel(item) {
				eventBus.$emit(event.CHOICE_BRAND, item)
				this.$f7.mainView.router.back()
			}
		}
	}
</script>