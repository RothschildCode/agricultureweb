<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view" main>
		<subnavbar :list="subnavbarItems" :activeIndex="tabIndex" :more="false" :mescrollArr="mescrollArr"></subnavbar>
        <f7-pages>
			<div data-page="news" class="page news-page navbar-through">		
				<div class="page-content">
					<div class="swiper-container" ref="swiper">
						<div class="swiper-wrapper">
							<div v-for="(item, $index) in subnavbarItems" class="swiper-slide">
								<news-container :uniqueKey="$index" :condition="item" :initload="$index == tabIndex" :mescrollArr="mescrollArr"></news-container>
							</div>
						</div>
					</div>
				</div>

			</div>
        </f7-pages>
      </f7-view>
    </f7-views>
    <refresh-background></refresh-background>
  </div>
</template>

<script>
	import NewsContainer from '../component/NewsContainer'
	import Subnavbar from '../component/Subnavbar'
	import MediaWrap from '../component/MediaWrap'
	import RefreshBackground from '../component/RefreshBackground'
	import Swiper from 'swiper'

	import {v, EVENTS} from '../core/vbus'

	export default {
		data() {
			return {
				subnavbarItems: [],
				swiper: null,
				tabIndex: 0,
				pageId: 2,
				mescrollArr: [],
				dataCacheName: 'app_data_cache_subnavbars'
			}
		},
		created() {
			v.$on(EVENTS.SUBNAV_ITEM_TAP, this.tabChange)
			this.init()
		},
		updated() {
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
			init() {
				var subnavbars = this.appUtil.getCache(this.dataCacheName)
				if(subnavbars) {
					this.subnavbarItems = subnavbars
				}
				this.getSubnavbars()
			},
			tabChange(index) {
				this.tabIndex = index
				this.swiper.slideTo(index, 0)
			},			
			getSubnavbars() {
				var self = this
				this.$ajax({
					data: {
						api: 'page_type',
						pageid: this.pageId
					},
					pageRefresh: !this.subnavbarItems.length > 1
				}, (data) => {
					data.unshift({
						cname: '全部'
					})
					self.appUtil.putCache(self.dataCacheName, data)
					self.subnavbarItems = data
				})
			},
			goPublish() {
				window.location.href = 'reply.html?webview_transition&type=1&pageid=' + this.pageId
			},			
		},
		components: {
			NewsContainer,
			Subnavbar,
			MediaWrap,
			RefreshBackground
		}
	}
</script>