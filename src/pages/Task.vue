<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view" main>
        <f7-pages>
			<div data-page="task" class="page task-page">
				<div class="page-content">
					<h3 class="task-title" v-html="args.taskTitle"></h3>
					<div class="list-block accordion-list">
					  <ul>
					    <li v-for="(item, index) in list" class="accordion-item" :class="{selected: item.selected, 'accordion-item-expanded': item.selected}">
					    	<a href="#" class="item-content item-link" @click="select(item)">
					    		<div class="item-media">
					    			<i v-if="item.filled" style="color: green;" class="f7-icons">check_round_fill</i>
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
												<input type="radio" name="my-radio" :value="opt.value" checked="checked">
												<div class="item-inner task-opt" @click="fill(item, index, opt.value)">
										        	<div class="item-title" v-html="opt.text"></div>
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
														<textarea placeholder="点击填写" @change="fill(item, index, $event)"></textarea> 
													</div>
												</div>
											</div>
										</li>						
									</ul>
									<multi-preview v-if="item.photograph_group" :multis="item.multis"></multi-preview>
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
	import {gethttp} from '../common/http'

	let http = gethttp({
		indicator: true
	})

	export default {
		data() {
			return {
				list: [],
				args: {}
			}
		},
		created() {
			this.getArgs()
		},
		methods: {
			getArgs() {
				var task = $.getData('taskclassify')
				this.args = {
					taskId: task.check_up_id,
					taskTitle: task.check_up_name
				}
				this.getContent()
			},
			taskToggle(task) {
				task.opened = !task.opened
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
				var curr = null
				for(var i = 0; i < this.list.length; i++) {
					var _item = this.list[i]
					if(_item.selected) {
						curr = _item.content_id
						_item.selected = false
					}
				}
				if(item.content_id != curr) {
					item.selected = true
				}
				this.$set(this, 'list', this.list)
			},
			getContent() {
				var _this = this
				http({
					data: {
						api: 'site_content',
						check_up_id: this.args.taskId,
						uid: '1'
					},
					method: 'post'
				}).then((res) => {
					var list = res.data
					for(var i = 0; i < list.length; i++) {
						var l = list[i]
						l.filled = false
						l.selected = false
						if(l.content_type == 1) {
							l.opts = new Array()
							var optlabels = l.content_value.split('/')
							for(var j = 0; j < optlabels.length; j++) {
								l.opts.push({
									value: j,
									text: optlabels[j]
								})
							}
						}
						l.multis = new Array()
 					}
					_this.list = res.data
				}).catch((err) => {
					alert(err)
				})
			}
		},
		components: {
			MultiPreview
		}
	}
</script>