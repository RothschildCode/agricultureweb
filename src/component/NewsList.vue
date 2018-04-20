<script type="text/javascript">
	import PullRefreshList from './PullRefreshList'
	import ListItem from './NewItem'
	import http from '../common/http'
	export default {
		extends: PullRefreshList,
		methods: {
			getData(isnext) {

				if(isnext && this.isloading) return
				this.isloading = true

				var pageIndex = isnext ? (this.pageIndex + 1) : 1

				var data = {
					api: 'college_post_list',
					displayNumber: 15,
					pageIndex,
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
					if(isnext) {
						newlist = _this.list.concat(list)
						_this.isloading = false
					}else {
						_this.$f7.pullToRefreshDone()
					}
					this.list = newlist
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