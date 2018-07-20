<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view" main>
		<subnavbar v-if="!channel" :list="subnavbarItems" :activeIndex="tabIndex" :more="true"></subnavbar>
        <f7-pages>
			<div data-page="news" class="page news-page" :class="{'navbar-through': !channel}">		
<!-- 				<a href="#" class="floating-button color-pink" @click="goPublish">
					<i class="f7-icons">add</i>
				</a> -->
				<float-button type="1" :page="pageId"></float-button>
				<div class="page-content">
					<div class="swiper-container" ref="swiper">
						<div class="swiper-wrapper">
							<div v-for="(item, $index) in subnavbarItems" class="swiper-slide">
								<sociality-container :uniqueKey="$index" :condition="item" :channel="channel" :initload="$index == tabIndex"></sociality-container>
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
	import SocialityContainer from '../component/SocialityContainer'
	import Subnavbar from '../component/Subnavbar'
	import MediaWrap from '../component/MediaWrap'
	import FloatButton from '../component/FloatButton'
	import Swiper from 'swiper'

	import {v, EVENTS} from '../core/vbus'

	export default {
		data() {
			return {
				subnavbarItems: [],
				pageId: 1,
				tabIndex: 0,
				swiper: null,
				channel: null,
				dataCacheName: 'app_data_cache_socialities'
			}
		},
		created() {
			var channel = $.getUrlParam('channel')
			if(channel) {
				var channels = this.appUtil.getCache('app_data_cache_channels')
				for(var i = 0; i < channels.length; i++) {
					if(channels[i].cid == channel) {
						this.channel = channels[i]
						break
					}
				}
				this.subnavbarItems = [this.channel]
				return
			}
			var tabs = [
				{
					cname: '全部'
				},
				{
					cname: '推荐',
					recommend: true
				},
				{
					cname: '精华帖',
					marrow: true
				}
			]
			this.subnavbarItems = tabs
			v.$on(EVENTS.SUBNAV_ITEM_TAP, this.tabChange)
		},
		mounted() {
			if(this.swiper == null && this.channel == null) {
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
			goPublish() {
				window.location.href = 'reply.html?webview_transition&type=1&pageid=' + this.pageId
			},
			tabChange(index) {
				if(index == -1) {
					this.appUtil.putCache('channels_page_params', {target: 1})
					window.location.href = 'channels.html?webview_transition'
					return
				}
				this.tabIndex = index
				this.swiper.slideTo(index, 0)
			}
		},
		components: {
			SocialityContainer,
			Subnavbar,
			MediaWrap,
			FloatButton
		}
	}
</script>