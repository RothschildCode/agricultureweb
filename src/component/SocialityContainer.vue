<script type="text/javascript">
	import BaseContainer from './base/MeScrollContainer'
	import ContentWrap from './SocialityWrap'
	import {http} from '../common/http'
	export default {
		extends: BaseContainer,
		props: ['condition', 'channel'],
		data() {
			return {
				pageSize: 15,
				pageId: 1,
				loaded: false
			}
		},
		created() {
			this.data = {
				list: [],
				channel: this.channel
			}
		},
		methods: {
			getListData() {
				var param = {
					api: 'college_post_list',
					displayNumber: this.pageSize,
					pageIndex: this.pageIndex,
					fid: 2,
					pageid: this.pageId
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
				http({
					data: param,
					method: 'post'
				}).then((res) => {
					var list = res.data.data
					for(var i = 0; i < list.length; i++) {
						list[i].cover = 'http://39.107.99.122/university/images/img_14347674602997.jpg'
						list[i].message = $.parseRichText(list[i].message)
					}
					self.loaded = true
					self.getDone(true, list)
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