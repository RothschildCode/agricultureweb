<script type="text/javascript">
	import Wrapper from './PullScrollWrapper'
	import ContentView from './InfoPage'
	import {gethttp} from '../common/http'

	let http = gethttp()

	export default {
		extends: Wrapper,
		data() {
			return {
				list: [{
					title: '范冰冰抵达戛纳入住专属套房 经典美照挂满墙',
					images: [
						'//img1.gtimg.com/rcdimg/20180509/11/3052928863_227x148.jpg',
						'//img1.gtimg.com/rcdimg/20180509/11/4624881005_227x148.jpg',
						'//img1.gtimg.com/rcdimg/20180509/11/7485219571_227x148.jpg'
					]
				}]
			}
		},		
		methods: {
			getData() {
				var data = {
					api: 'college_post_list',
					displayNumber: this.pageSize,
					pageIndex: this.pageIndex,
					fid: 2
				}
				// var _this = this
				// http({
				// 	data,
				// 	method: 'post'
				// }).then((res) => {
				// 	var list = res.data
				// 	var newlist = list
				// 	for(var i = 0; i < list.length; i++) {
				// 		list[i].cover = 'http://39.107.99.122/university/images/img_14347674602997.jpg'
				// 		list[i].message = $.parseRichText(list[i].message)
				// 	}
				// 	_this.loadDone(list)
				// }).catch((err) => {
				// 	_this.loadError(err)
				// })

				// this.loadDone([{
				// 	title: '范冰冰抵达戛纳入住专属套房 经典美照挂满墙',
				// 	images: [
				// 		'//img1.gtimg.com/rcdimg/20180509/11/3052928863_227x148.jpg',
				// 		'//img1.gtimg.com/rcdimg/20180509/11/4624881005_227x148.jpg',
				// 		'//img1.gtimg.com/rcdimg/20180509/11/7485219571_227x148.jpg'
				// 	]
				// }])

			}
		},
		components: {
			ContentView
		}
	}
</script>