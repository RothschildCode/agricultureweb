<template>
	<f7-popup class="building-list-popup">
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
	</f7-popup>
</template>

<script type="text/javascript">
	import {mapState} from 'vuex'
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
						that.list = data
					}
				})
			},
			onSel(item) {
				this.$emit('on-sel', item)
			}
		}
	}
</script>