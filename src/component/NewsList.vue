<script type="text/javascript">
	import BaseList from './BaseList'
	import ListItem from './NewItem'
	import {http} from '../common/http'
	export default {
		extends: BaseList,
		methods: {
			getData() {
				var data = {
					api: 'college_post_list',
					displayNumber: this.pageSize,
					pageIndex: this.pageIndex,
					fid: 2
				}
				var _this = this
				http({
					data,
					method: 'post'
				}).then((res) => {
					var list = res.data
					var newlist = list
					for(var i = 0; i < list.length; i++) {
						list[i].cover = 'http://peining.tunnel.echomod.cn/university/images/img_14347674602997.jpg'
					}
					_this.loadDone(list)
				}).catch((err) => {
					_this.loadError(err)
				})
			}
		},
		components: {
			ListItem
		}
	}
</script>