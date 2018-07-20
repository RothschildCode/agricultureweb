<script type="text/javascript">
	import BaseContainer from './base/MeScrollContainer'
	import ContentWrap from './SocialityWrap'
	export default {
		extends: BaseContainer,
		props: ['condition', 'channel'],
		data() {
			return {
				data: {
					list: this.appUtil.getCache('app_data_cache_socialities_' + this.channel) || [],
					channel: this.channel
				},
				pageId: 1,
				loaded: false
			}
		},
		methods: {
			getListData(page) {
				var param = {
					api: 'college_post_list',
					displayNumber: this.pageSize,
					pageIndex: page.num,
					fid: 2,
					pageid: this.pageId,
					area: this.appUtil.getArea()
				}
				if(this.condition&&this.condition.cid) {
					param.cid = this.condition.cid
				}
				if(this.condition&&this.condition.recommend == true) {
					param.recommend = '1'
				}
				if(this.condition&&this.condition.marrow == true) {
					param.marrow = '1'
				}
				var self = this
				this.$ajax({
					data: param,
					errorMsg: '加载失败'
				}, (data) => {
					var list = data
					for(var i = 0; i < list.length; i++) {
						list[i].dateline = $.longToDate(list[i].dateline)
						list[i].message = $.parseRichText(list[i].message)
					}
					self.loaded = true
					self.getDone(true, list, page.num, {
						cache: true,
						cacheKey: 'app_data_cache_socialities_' + self.data.channel
					})
				}, (err) => {
					self.getDone(false)
				})
			}
		},
		components: {
			ContentWrap
		}
	}	
</script>