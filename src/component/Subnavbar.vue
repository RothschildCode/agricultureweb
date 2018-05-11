<template>
	<div class="navbar">
	  <div class="navbar-inner h-auto">
	    <div class="subnavbar" ref="wrap">
	      <div class="buttons-row">
	      <a href="#" class="button tab-link" :class="{active: !cid}" @click="navClick(null, -1)" ref="tabActive">推荐</a>
	      <a v-for="item in list" href="#" class="button tab-link" :class="{active: item.cid==cid}" v-html="item.cname" @click="navClick(item)" :ref="item.cid==cid?'tabActive':'tab'"></a>
	      </div>
	    </div>
	  </div>
	</div>
</template>

<script type="text/javascript">
	import {eventbus, EVENTS} from '../js/bus'
	export default {
		props: ['list', 'cid'],
		mounted() {
			var cw = document.body.clientWidth
			var $activeTab = $(this.$refs.tabActive)
			var left = $activeTab.offset().left
			var $wrap = $(this.$refs.wrap)
			var sl = left - ((cw - $activeTab.width() - 16) / 2)
			console.log(sl)
			$wrap.scrollLeft(sl)
		},
		methods: {
			navClick(data) {
				eventbus.$emit(EVENTS.SUBNAV_ITEM_TAP, data)
			}
		}
	}
</script>