<script type="text/javascript">
	import Wrapper from './PullScrollWrapper'
	import ListItem from './TaskClassifyItem'
	import {gethttp} from '../common/http'

	let http = gethttp()

	export default {
		extends: Wrapper,
		methods: {
			getData() {
				var data = {
					api: 'site_check_group',
					uid: 1
				}
				var _this = this
				http({
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