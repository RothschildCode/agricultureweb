<template>
<f7-page class="navbar-fixed">
	<div class="user-info-config">
		<div class="list-block">
			<ul>
			    <li>
			      <div class="item-content">
			        <div class="item-media"><i class="icon icon-form-name"></i></div>
			        <div class="item-inner">
			          <div class="item-title label">区域标识</div>
			          <div class="item-input">
			            <select>
			            	<option v-for="(item, index) in areas" :value="item.value" v-html="item.name"></option>
			            </select>
			          </div>
			        </div>
			      </div>
			    </li>			
			    <li>
			      <div class="item-content">
			        <div class="item-media"><i class="icon icon-form-name"></i></div>
			        <div class="item-inner">
			          <div class="item-title label">是否代办</div>
			          <div class="item-input">
			            <select>
			            	<option v-for="(item, index) in agency" :value="item.value" v-html="item.name"></option>
			            </select>
			          </div>
			        </div>
			      </div>
			    </li>
			    <li>
			      <a class="item-link item-content" @click="buildingRowClick()">
			        <div class="item-media"><i class="icon icon-form-name"></i></div>
			        <div class="item-inner">
			          <div class="item-title label">楼宇信息</div>
			        </div>
			      </a>
			    </li>
			    <li>
			      <a class="item-link item-content">
			        <div class="item-media"><i class="icon icon-form-name"></i></div>
			        <div class="item-inner">
			          <div class="item-title label">局向</div>
			        </div>
			      </a>
			    </li>			    
			</ul>
		</div>	
		<div class="content-block">
			<div class="row">
				<!-- <div class="col-50"><a href="#" class="button button-big button-fill color-red"></a></div> -->
				<div class="col-100">
					<a class="button button-big button-fill color-green" @click="route()">查询</a>
				</div>
			</div>
		</div>
	</div>
</f7-page>
</template>

<script type="text/javascript">
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				areas: [],
				agency: [],
				building: null,
				brandDirection: null
			}
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				var that = this
				this.$store.dispatch('getUserInfoConfigAreas', (data) => {
					that.areas = data
				})
				this. $store.dispatch('getUserInfoConfigAgency', (data) => {
					that.agency = data
				})
				this.$store.dispatch('getBuildingData', (data) => {
					that.building = data
				})
				// this.$store.dispatch('getBrandDirectionData', (data) => {
				// 	that.brandDirection = data
				// })
			},
			buildingRowClick() {
				this.$f7.mainView.router.load({url: '/list/building/'})
			}
		}
	}
</script>