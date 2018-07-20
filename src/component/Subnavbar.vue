<template>
	<div class="navbar">
	  <div class="navbar-inner h-auto">
	    <div class="subnavbar tabs-row" ref="scrollContent">
	      <div class="buttons-row">
	      <a v-if="firstDefault" href="#" class="button tab-link" :class="{active: activeIndex == 0}" @click="navClick(0)" :ref="activeIndex == 0 ? 'activeDom' : ''">全部</a>
	      <a v-for="(item, $index) in list" href="#" class="button tab-link" :class="{active: $index == activeIndex}" :style="itemStyle" v-html="item.cname" @click="navClick($index)" :ref="$index == activeIndex ? 'activeDom' : ''"></a>
	      <a v-if="more" class="button tab-link more" @click="navClick(-1)">
	      	<i class="f7-icons fontsize-2x">more</i>
	      </a>
	      </div>
	    </div>
	  </div>
	</div>
</template>

<script type="text/javascript">
	import {v, EVENTS} from '../core/vbus'
	
	export default {
		props: ['list', 'activeIndex', 'more', 'mescrollArr', 'firstDefault', 'widthAve'],
		data() {
			return {
				firstDef: this.firstDefault == null ? true : this.firstDefault,
				wAve: this.widthAve == true ? true : false,
				itemStyle: null
			}
		},
		created() {
			if(this.wAve) {
				var len = this.list.length + (this.firstDef ? 1 : 0)
				this.itemStyle = {
					width: document.body.clientWidth / len + 'px'
				}
			}
		},
		updated() {
			var mescrollArr = this.mescrollArr
			if(mescrollArr && mescrollArr[this.activeIndex]) {
				//更改列表条件
				var curNavDom = this.$refs.activeDom[0] ? this.$refs.activeDom[0] : this.$refs.activeDom
				//菜单项居中动画
				var scrollxContent = this.$refs.scrollContent
				var star = scrollxContent.scrollLeft;//当前位置
				var end = curNavDom.offsetLeft + curNavDom.clientWidth/2 - document.body.clientWidth/2; //居中
				mescrollArr[this.activeIndex].getStep(star, end, function(step,timer){
					scrollxContent.scrollLeft=step; //从当前位置逐渐移动到中间位置,默认时长300ms
				});
				//隐藏当前回到顶部按钮
				mescrollArr[this.activeIndex].hideTopBtn();
				//取出菜单所对应的mescroll对象,如果未初始化则初始化
				var curMescroll=this.mescrollArr[this.activeIndex];
				var curScrollTop=curMescroll.getScrollTop();
				if(curScrollTop>=curMescroll.optUp.toTop.offset){
					curMescroll.showTopBtn();
				}else{
					curMescroll.hideTopBtn();
				}
			}
		},
		methods: {
			navClick(index) {
				v.$emit(EVENTS.SUBNAV_ITEM_TAP, index)
			}
		}
	}
</script>