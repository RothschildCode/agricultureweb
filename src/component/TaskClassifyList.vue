<script type="text/javascript">
	import BaseList from './BaseList'
	import ListItem from './TaskClassifyItem'
	import {getHttp} from '../common/http'
	export default {
		extends: BaseList,
		methods: {
			getData() {
				var data = {
					api: 'site_check_group',
					uid: 1
				}
				var _this = this
				getHttp({showIndicator: false})({
					data,
					method: 'post'
				}).then((res) => {
					_this.loadDone(res.data)
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