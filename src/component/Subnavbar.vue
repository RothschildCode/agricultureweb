<template>
	<div class="navbar">
	  <div class="navbar-inner h-auto">
	    <div class="subnavbar" ref="wrap">
	      <div class="buttons-row">
	      <a href="#" class="button tab-link" :class="{active: activeIndex == 0}" @click="navClick(0)">全部</a>
	      <a v-if="$index!=0" v-for="(item, $index) in list" href="#" class="button tab-link" :class="{active: $index == activeIndex}" v-html="item.cname" @click="navClick($index)"></a>
	      <a v-if="more" class="button tab-link more" @click="navClick(-1)">
	      	<i class="f7-icons">more</i>
	      </a>
	      </div>
	    </div>
	  </div>
	</div>
</template>

<script type="text/javascript">
	import {eventbus, EVENTS} from '../js/bus'
	export default {
		props: ['list', 'activeIndex', 'more'],
		methods: {
			navClick(index) {
				eventbus.$emit(EVENTS.SUBNAV_ITEM_TAP, index)
			}
		}
	}
</script>