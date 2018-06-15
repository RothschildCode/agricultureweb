<script type="text/javascript">
	import BaseContainer from './base/MeScrollContainer'
	import ContentWrap from './NewsWrap'
	import {http} from '../common/http'
	export default {
		extends: BaseContainer,
		props: ['condition'],
		data() {
			return {
				pageId: 2,
				loaded: false
			}
		},
		created() {
			this.data = {
				list: []
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
				http({
					data: param,
					method: 'post'
				}).then((res) => {
					var list = res.data.data
					for(var i = 0; i < list.length; i++) {
						list[i].dataline = $.longToDate(list[i].dateline)
						list[i].message = $.parseRichText(list[i].message)
					}
					self.loaded = true
					self.getDone(true, list, page.num)
				}).catch((err) => {
					self.getDone(false)
				})
			}
		},
		components: {
			ContentWrap
		}
	}	
</script>