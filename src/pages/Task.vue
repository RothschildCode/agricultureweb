<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view" main>
        <f7-pages>
			<div data-page="task" class="page task-page">
				<a href="#" class="floating-button color-pink" @click="done">
					<i class="f7-icons">cloud_upload</i>
				</a>
				<div class="page-content">
					<div class="list-block accordion-list">
					  <ul>
					    <li v-for="(item, $index) in list" class="accordion-item" :class="{selected: item.content_id==currentItem.content_id, 'accordion-item-expanded': item.content_id==currentItem.content_id}">
					    	<a href="#" class="item-content item-link" @click="select(item)">
					    		<div class="item-media">
					    			<i v-if="dataMap[$index].result_value&&dataMap[$index].result_value!=''" style="color: green;" class="f7-icons">check_round_fill</i>
					    		</div>
						        <div class="item-inner">
						          <div class="item-title" v-html="item.content_title"></div>
						        </div>
					        </a>
							<div class="accordion-item-content">
								<div class="content-block">
									<ul v-if="item.content_type == 1">
										<li v-for="opt in item.opts">
											<label class="label-radio item-content">
												<input type="radio" name="my-radio" v-bind:checked="dataMap[$index].result_value==opt" v-bind:disabled="dataMap[$index].filled">
												<div class="item-inner task-opt" :class="{disabled:dataMap[$index].filled}" @click="radioClick($index, opt)">
										        	<div class="item-title" v-html="opt"></div>
										        </div>
											</label>
										</li>
									</ul>
									<ul v-if="item.content_type == 2">
										<li>
											<div class="item-content">
												<div class="item-inner">
													<!-- <div class="item-title label" v-html="item.content_title"></div> -->
													<div class="item-input item-input-field">
														<textarea v-model="dataMap[$index].result_value" v-bind:disabled="dataMap[$index].filled" placeholder="点击填写" @change="fill(item, $index, $event)"></textarea>
													</div>
												</div>
											</div>
										</li>						
									</ul>
									<multi-preview v-if="item.photograph_group" :data="dataMap[$index].photo_list" :readonly="dataMap[$index].photo_urls.length > 0" :urls="dataMap[$index].photo_urls"></multi-preview>
								</div>
							</div>
					    </li>
					  </ul>
					</div>				

				</div>
			</div>
        </f7-pages>
      </f7-view>
    </f7-views>
  </div>
</template>

<script>
	import MultiPreview from '../component/MultiPreview'
	import EnclosureUploader from '../js/EnclosureUploader'
	import {gethttp} from '../common/http'

	let http = gethttp({
		indicator: true
	})

	export default {
		data() {
			return {
				list: [],
				args: {},
				currentItem: {},
				dataMap: {}
			}
		},
		created() {
			this.taskId = $.getUrlParam('taskId')
			this.getContent()
		},
		methods: {
			taskToggle(task) {
				task.opened = !task.opened
			},
			radioClick(index, value) {
				if(this.dataMap[index].filled) return
				this.dataMap[index].result_value = value
			},
			fill(item, index, arg) {
				if(item.content_type == 1) {
					item.value = arg
				}
				if(item.content_type == 2) {
					item.value = $(arg.currentTarget).val()
				}
				item.filled = true
				this.$set(this.list, index, item)
			},
			select(item) {
				this.currentItem = item
			},
			getContent() {
				var _this = this
				http({
					data: {
						api: 'site_content',
						check_up_id: this.taskId
					},
					method: 'post'
				}).then((res) => {
					var list = res.data.data
					var dataMap = new Array()
					for(var i = 0; i < list.length; i++) {
						if(list[i].content_type == 1) {
							list[i].opts = list[i].content_value.split('/')
						}
						dataMap.push({
							content_id: list[i].content_id,
							user_id: 1,
							result_value: list[i].result_value,
							result_photos: list[i].result_photos,
							photo_urls: list[i].result_photos?list[i].result_photos.split(';'):[],
							photo_list: [],
							filled: list[i].result_value!=null&&list[i].result_value!=''?true:false
						})
					}
					_this.dataMap = dataMap
					_this.list = list
				}).catch((err) => {
					alert(err)
				})
			},
			done() {
				var _this = this
				this.$f7.modal({
					title: '确定提交任务吗？',
					buttons: [{
						text: '提交',
						bold: true,
						onClick: function() {
							var uploader = new EnclosureUploader()
							var doneCount = 0
							for(var i = 0; i < _this.dataMap.length; i++) {
								(function(dataItem, len) {
									uploader.upload(dataItem.photo_list, (urlsText) => {
										dataItem.result_photos = urlsText	
										doneCount += 1
										if(doneCount >= len) {
											_this.post()
										} 
									})
								})(_this.dataMap[i], _this.dataMap.length)
							}
						}
					}, {
						text: '取消'
					}]
				})
			},
			post() {
				var set = new Array()
				for(var i = 0; i < this.dataMap.length; i++) {
					if(this.dataMap[i].result_value != '' && this.dataMap[i].result_photos != '') {
						set.push({
							content_id: this.dataMap[i].content_id,
							user_id: 1,
							result_value: this.dataMap[i].result_value,
							result_photos: this.dataMap[i].result_photos
						})
					}
				}

				http({
					data: {
						api: 'site_result',
						uid: 1,
						site_list: JSON.stringify(set)
					},
					method: 'post'
				}).then((res) => {
					if(res.data.s == 0) {
						this.$f7.alert('任务提交成功')
					}else {
						this.$f7.alert('任务提交失败')
					}
				})
			}
		},
		components: {
			MultiPreview
		}
	}
</script>
