<template>
	<div>
		<div v-if="data.list.length > 0" class="list-block accordion-list">
		  <ul>
		    <li v-for="(item, $index) in data.list" class="accordion-item" :class="{selected: item.content_id==currentItem.content_id, 'accordion-item-expanded': item.content_id==currentItem.content_id}">
		    	<a href="#" class="item-content item-link" @click="select(item)">
		    		<div class="item-media">
		    			<i v-if="item.status==1" style="color: green;" class="f7-icons">check_round_fill</i>
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
									<input type="radio" name="my-radio" v-bind:checked="item.result_value==opt" v-bind:disabled="item.filled">
									<div class="item-inner task-opt" :class="{disabled:item.filled}" @click="radioClick($index, opt)">
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
											<textarea v-model="item.result_value" v-bind:disabled="item.status == 1" placeholder="点击填写"></textarea>
										</div>
									</div>
								</div>
							</li>						
						</ul>
						<multi-preview v-if="item.photograph_group" 
										:data="item.photo_list" 
										:readonly="item.status == 1" 
										:urls="item.photo_urls">
						</multi-preview>
					</div>
				</div>
		    </li>
		  </ul>
		</div>
	</div>
</template>

<script>
	import MultiPreview from './MultiPreview'
	import ImageUploader from '../plugins/imguploader'

	export default {
		props: ['data'],
		data() {
			return {
				currentItem: {},
				// data.list: this.data.list,
				ableCount: 0
			}
		},
		// watch: {
		// 	data(newVal, oldVal) {
		// 		console.log(1)
		// 		this.data.list = this.data.list
		// 	}
		// },
		methods: {
			taskToggle(task) {
				task.opened = !task.opened
			},
			radioClick(index, value) {
				if(this.data.list[index].filled) return
				this.data.list[index].result_value = value
			},
			select(item) {
				this.currentItem = item
			},
			done() {
				var self = this
				this.$f7.modal({
					title: '确定提交任务吗？',
					text: '请认真检查任务填写结果，已填写的任务提交后将无法修改。',
					buttons: [{
						text: '提交',
						bold: true,
						onClick: function() {
							var uploader = new ImageUploader()
							var doneCount = 0
							for(var i = 0; i < self.data.list.length; i++) {
								if(!self.data.list[i].filled) {
									(function(dataItem) {
										uploader.upload(dataItem.photo_list, (urlsText) => {
											dataItem.result_photos = urlsText	
											doneCount += 1
											if(doneCount >= self.data.list.length) {
												self.post()
											}
										})
									})(self.data.list[i])
								}
							}
						}
					}, {
						text: '取消'
					}]
				})
			},
			post() {
				var postlist = new Array()
				for(var i = 0; i < this.data.list.length; i++) {
					var flag = true
					if(!this.data.list[i].filled) {
						if(!$.stringEmpty(this.data.list[i].conetnt_type)) {
							if($.stringEmpty(this.data.list[i].result_value)) {
								flag = false
							}
						}
						if(!$.stringEmpty(this.data.list[i].photograph_group)) {
							if($.stringEmpty(this.data.list[i].result_photos)) {
								flag = false
							}
						}
						if(flag) {
							postlist.push({
								content_id: this.data.list[i].content_id,
								user_id: 1,
								result_value: this.data.list[i].result_value,
								result_photos: this.data.list[i].result_photos
							})
						}
					}
				}

				if(postlist.length <= 0) {
					this.$f7.modal({
						title: '没有要提交的任务哦:(',
						buttons: [{
							text: '做任务'
						}]
					})
					return
				}
				var self = this

				this.appUtil.loginedInfo(({uid}) => {
					self.$ajax({
						data: {
							api: 'task_post_commit',
							site_list: JSON.stringify(postlist),
							uid
						},
						errorMsg: '抱歉，任务提交失败了:(',
						showLoading: true
					}, (data) => {
						self.$f7.modal({
							title: '任务提交成功了:)',
							buttons: [{
								text: '好',
								onClick: function() {
									window.location.reload()
								}
							}]
						})
					})					
				})
			}
		},
		components: {
			MultiPreview
		}
	}
</script>
