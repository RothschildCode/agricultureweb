<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view"  main>
        <f7-pages>
			<div data-page="task-classify" class="page task-classify-page">
				<div class="page-content">
					<div class="list-block">
						<ul>
							<li v-for="item in list">
								<a class="item-link item-content" @click="click(item)">
									<div class="item-meida">
										<i class="f7-icons">compose</i>
									</div>
									<div class="item-inner">
										<div class="item-title" v-html="item.check_up_name"></div>
										<div class="item-after">
											
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
					api: 'site_check_group',
					uid: 1
				}
				var _this = this
				http({
					data,
					method: 'post'
				}).then((res) => {
					_this.list = res.data
				}).catch((err) => {
					alert(err)
				})
			},
			click(data) {
				$.setData('taskclassify', data)
				VueG.loadPage('task.html?webview_transition')
			}
		}
	}
</script>