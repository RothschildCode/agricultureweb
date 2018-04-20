<script type="text/javascript">
	import PullRefreshList from './PullRefreshList'
	import ListItem from './NewItem'
	import http from '../common/http'
	export default {
		extends: PullRefreshList,
		methods: {
			getData() {
				var _this = this
				http({
					data: {
						api: 'college_post_list',
						displayNumber: 15,
						pageIndex: 1,
						fid: 2
					},
					method: 'post'
				}).then((res) => {
					var list = res.data
					for(var i = 0; i < list.length; i++) {
						list[i].cover = 'http://peining.tunnel.echomod.cn/university/images/img_14347674602997.jpg'
					}
					this.list = list
					_this.$f7.pullToRefreshDone()
				}).catch((err) => {
					alert('Network Error')
					_this.$f7.pullToRefreshDone()
				})
			}
		},
		components: {
			ListItem
		}
	}
</script>