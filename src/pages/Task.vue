<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view" main>
		<subnavbar 	:list="subnavbarItems" 
					:activeIndex="tabIndex"
					:firstDefault="false"
					:widthAve="true"></subnavbar> 
        <f7-pages>
			<div data-page="task" class="page task-page navbar-through">
				<a v-if="tabIndex==0" href="#" class="floating-button" @click="done()">提交</a>
				<div class="page-content">
					<div class="swiper-container" ref="swiper">
						<div class="swiper-wrapper">
							<div v-for="(item, $index) in subnavbarItems" class="swiper-slide">
								<task-container :noDataTip="'您暂时没有接收到任何任务'"
												:refreshBtnLabel="'刷新任务列表'"
												:uplock="true"
												:uniqueKey="$index"
												:initload="$index == tabIndex"
												:status="item.status"
												ref="taskWrap">
								</task-container>
							</div>
						</div>
					</div>
				</div>
			</div>
        </f7-pages>
      </f7-view>
    </f7-views>
  </div>
</template>

<script>
	import TaskContainer from '../component/TaskContainer'
	import Subnavbar from '../component/Subnavbar'
	import Swiper from 'swiper'
	import {v, EVENTS} from '../core/vbus'
	export default {
		data() {
			return {
				subnavbarItems: [{
					cname: '待办任务',
					status: 0
				}, {
					cname: '已办任务',
					status: 1
				}],
				tabIndex: 0,
				swiper: null
			}
		},
		created() {
			v.$on(EVENTS.SUBNAV_ITEM_TAP, this.tabChange)
		},
		mounted() {
			if(this.swiper == null) {
				var self = this
				var swiper = $(this.$refs.swiper)					
				this.swiper = new Swiper('.swiper-container', {
					on: {
						slideChangeTransitionEnd: function() {
							self.tabChange(this.snapIndex)
						}
					}
				})
			}
		},		
		methods: {
			tabChange(index) {
				this.tabIndex = index
				this.swiper.slideTo(index, 0)
			},
			done() {
				this.$refs.taskWrap[0].$refs.contentWrap.done()
			}
		},
		components: {
			Subnavbar,
			TaskContainer
		}
	}
</script>
