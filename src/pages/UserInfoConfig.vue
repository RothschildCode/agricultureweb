<template>
	<div data-page="uic" class="page navbar-fixed">
		<div class="navbar">
			<div class="navbar-inner">
				<div class="left"></div>
				<div class="center">设置用户信息</div>
				<div class="right">
					<a class="link show" @click="ok()">完成</a>
				</div>
			</div>
		</div>
		<div class="user-info-config page-content">
			<div class="list-block">
				<ul>
				    <li>
				      <div class="item-content">
				        <div class="item-media"><i class="icon icon-form-name"></i></div>
				        <div class="item-inner">
				          <div class="item-title label">区域标识</div>
				          <div class="item-input">
				            <select v-model="areaVal">
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
				            <select v-model="agencyVal">
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
				          <div class="item-subtitle label" v-html="building.address"></div>
				        </div>
				      </a>
				    </li>
				    <li>
				      <a class="item-link item-content" @click="brandDirRowClick()">
				        <div class="item-media"><i class="icon icon-form-name"></i></div>
				        <div class="item-inner">
				          <div class="item-title label">局向</div>
				          <div class="item-subtitle label" v-html="brandDirection.tmlName"></div>
				        </div>
				      </a>
				    </li>			    
				</ul>
			</div>	
		</div>
	</div>
</template>

<script type="text/javascript">
	import {mapState} from 'vuex'
	import {eventBus, event} from '../eventbus.js'

	export default {
		data() {
			return {
				areaVal: null,
				agencyVal: null,
				areas: [],
				agency: [],
				building: {},
				brandDirection: {}
			}
		},
		props: ['routeTo'],
		created() {
			var that = this
			this.init()
			eventBus.$on(event.CHOICE_BUILDING, (data) => {that.building = data})
			eventBus.$on(event.CHOICE_BRAND, (data) => {that.brandDirection = data})
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
			},
			buildingRowClick() {
				let that = this
				this.saveStore(1)
				this.$store.dispatch('updateBuildingRoute', {
					route: '/uic/',
					callback: () => {
						that.$f7.mainView.router.load({url: '/list/building/'})
						// that.$route.push({path: '/list/building/'})
					}
				})
			},
			brandDirRowClick() {
				let that = this
				this.saveStore(2)
				this.$store.dispatch('updateBrandDirectionRoute', {
					route: '/uic/',
					callback: () => {
						that.$f7.mainView.router.load({url: '/list/branddirection/'})
					}
				})
			},
			saveStore(step) {
				this.$store.dispatch('updateUserInfoConfig', {
					data: {
						areaVal: this.areaVal,
						agencyVal: this.agencyVal,
						building: this.building,
						brandDirection: this.brandDirection,
						datacb: step 
					}
				})
			},
			ok() {
				// if(!this.areaVal) {
				// 	this.$f7.alert('请选择区域标识', '提示')
				// 	return
				// }
				// if(!this.agencyVal) {
				// 	this.$f7.alert('请选择是否代办', '提示')
				// 	return
				// }
				// if(!this.building.code) {
				// 	this.$f7.alert('请选择楼宇信息', '提示')
				// 	return
				// }
				// if(!this.brandDirection.tmlCode) {
				// 	this.$f7.alert('请选择局向', '提示')
				// 	return
				// }
				// this.saveStore(0)
				this.$f7.mainView.router.load({url: this.routeTo})
			}
		}
	}
</script>