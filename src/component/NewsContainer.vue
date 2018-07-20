<script type="text/javascript">
	import BaseContainer from './base/MeScrollContainer'
	import ContentWrap from './NewsWrap'
	export default {
		extends: BaseContainer,
		props: ['condition'],
		data() {
			return {
				data: {
					list: this.appUtil.getCache('app_data_cache_news_' + this.condition.cid) || []
				},
				pageId: 2,
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
					pageid: this.pageId
				}
				if(this.condition&&this.condition.cid) {
					param.cid = this.condition.cid
				}
				var self = this
				this.$ajax({
					data: param,
					errorMsg: '加载失败'
				}, (data) => {
					var list = data
					for(var i = 0; i < list.length; i++) {
						list[i].dataline = $.longToDate(list[i].dateline)
						list[i].message = $.parseRichText(list[i].message)
					}
					self.loaded = true
					self.getDone(true, list, page.num, {
						cache: true,
						cacheKey: 'app_data_cache_news_' + self.condition.cid
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