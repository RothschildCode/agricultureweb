<script type="text/javascript">
	import BaseContainer from './base/MeScrollContainer'
	import ContentWrap from './TaskWrap'
	export default {
		extends: BaseContainer,
		props: ['status'],
		data() {
			return {
				pageId: 1,
				displayNumber: -1,
				loaded: false
			}
		},
		created() {
			this.data = {
				list: [],
				status: this.status
			}
		},
		methods: {
			dataHandler(list) {
				// var dataMap = []
				this.ableCount = list.length
				for(var i = 0; i < list.length; i++) {
					if(list[i].content_type == 1) {
						list[i].opts = list[i].content_value.split('/')
					}

					var aphotos = new Array()
					var bfilled = false
					if(list[i].result_photos) {
						aphotos = list[i].result_photos.split(';')
						if((aphotos[0] != '') || (list[i] && list[i] != '')) {
							bfilled = true
							this.ableCount -= 1
						}
					}else if(list[i].result_value != null && list[i].result_value != ''){
						bfilled = true
						this.ableCount -= 1
					}

					list[i].content_id = list[i].content_id
					list[i].user_id = 1
					list[i].result_value = list[i].result_value
					list[i].result_photos = list[i].result_photos
					list[i].photo_urls = aphotos
					list[i].photo_list = []
					list[i].filled = bfilled
					list[i].status = list[i].status
					list[i].content_type = list[i].content_type
					list[i].photograph_group = list[i].photograph_group

					// dataMap.push({
					// 	content_id: list[i].content_id,
					// 	user_id: 1,
					// 	result_value: list[i].result_value,
					// 	result_photos: list[i].result_photos,
					// 	photo_urls: aphotos,
					// 	photo_list: [],
					// 	filled: bfilled,
					// 	status: list[i].status,
					// 	content_type: list[i].content_type,
					// 	photograph_group: list[i].photograph_group
					// })
				}
				this.loaded = true
				this.getDone(true, list, 1)
			},
			getListData(page) {
				var self = this
				var uid = this.appUtil.getUid()
				if(uid == '') return
				this.$ajax({
					data: {
						api: 'task_post_list',
						uid: uid
					},
					errorMsg: '任务列表加载失败'
				}, (data) => {
					var tmplist = data || []
					var list = new Array()
					for(var i = 0 ; i < tmplist.length; i++) {
						if(tmplist[i].status == self.status) {
							list.push(tmplist[i])
						}
					}
					self.dataHandler(list)
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