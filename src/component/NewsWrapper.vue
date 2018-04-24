<script type="text/javascript">
	import Wrapper from './PullScrollWrapper'
	import ContentView from './NewsPage'
	import {gethttp} from '../common/http'

	let http = gethttp()

	export default {
		extends: Wrapper,
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
						list[i].message = $.parseRichText(list[i].message)
					}
					_this.loadDone(list)
				}).catch((err) => {
					_this.loadError(err)
				})
			}
		},
		components: {
			ContentView
		}
	}
</script>