<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view"  main>
        <f7-pages>
			<div data-page="task-classify" class="page task-classify-page">
				<div class="page-content">
					<div class="content-block-title">全部任务</div>
					<div class="list-block">
						<ul>
							<li v-for="item in list" @click="onclick(item)">
								<a href="" class="item-link item-content" @click="click(item)">
									<div class="item-media">
										<i class="icon icon-f7">
											<img :src="item.check_up_cover">
										</i>
									</div>
									<div class="item-inner">
										<div>
											<div class="item-title" v-html="item.check_up_name"></div>
											<div class="item-subtitle" v-html="item.description"></div>
										</div>
									</div>									
								</a>
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
	import {gethttp} from '../common/http'

	let http = gethttp({
		indicator: true
	})

	export default {
		data() {
			return {
				list: []
			}
		},
		created() {
			this.getData()
		},
		methods: {
			getData() {
				var _this = this
				var data = {
					api: 'site_check_group'
				}
				var _this = this
				http({
					data,
					method: 'post'
				}).then((res) => {
					_this.list = res.data.data
				}).catch((err) => {
					alert(err)
				})
			},
			click(data) {
				// $.setData('taskclassify', data)
				window.location.href = 'task.html?taskId='+data.check_up_id+'&webview_transition'
			}
		}
	}
</script>