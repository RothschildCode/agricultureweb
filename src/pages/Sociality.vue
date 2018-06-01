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
	import {eventbus, EVENTS} from '../js/bus'
	import {http} from '../common/http'

	import Swiper from 'swiper'

	export default {
		data() {
			return {
				subnavbarItems: [],
				pageId: 1,
				tabIndex: 0,
				swiper: null,
				channel: null
			}
		},
		created() {
			var channel = $.getUrlParam('channel')
			if(channel) {
				this.channel = app.get('channels')[channel]
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
			eventbus.$on(EVENTS.SUBNAV_ITEM_TAP, this.tabChange)
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
			getSubnavbars() {
				if(this.cid && this.cid != '') {
					this.subnavbarItems = app.get('subnavbar_news')
					return
				}
				var _this = this
				var data = {
					api: 'page_type',
					pageid: this.pageId
				}
				http({
					data,
					method: 'post'
				}).then((res) => {
					var list = res.data.data
					app.set('subnavbar_news', list)
					_this.subnavbarItems = list
					_this.refresh()
				})
			},
			tabChange(index) {
				if(index == -1) {
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