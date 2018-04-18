<template>
	<div class="user-info">
		<div class="list-block">
			<ul>			
			    <li>
			      <div class="item-content">
			        <div class="item-media"><i class="icon icon-form-name"></i></div>
			        <div class="item-inner">
			          <div class="item-title label">证件类型</div>
			          <div class="item-input">
			            <select v-model="identifyType">
			            	<option v-for="(item, index) in certTypeKey" :value="item" v-html="certTypeValue[index]"></option>
			            </select>
			          </div>
			        </div>
			      </div>
			    </li>
			    <li>
			      <div class="item-content">
			        <div class="item-media"><i class="icon icon-form-name"></i></div>
			        <div class="item-inner">
			          <div class="item-title label">证件号码</div>
			          <div class="item-input">
			            <input type="text" placeholder="" v-model="identNumber">
			          </div>
			        </div>
			      </div>
			    </li>
			    <li>
			      <div class="item-content">
			        <div class="item-media"><i class="icon icon-form-name"></i></div>
			        <div class="item-inner">
			          <div class="item-title label">接入号码</div>
			          <div class="item-input">
			            <input type="text" placeholder="" v-model="userNumber">
			          </div>
			        </div>
			      </div>
			    </li>
			</ul>
		</div>
		<div class="list-block">
			<ul>
			    <li>
			      <a class="item-link item-content" @click="userRowClick()">
			        <div class="item-media"><i class="icon icon-form-name"></i></div>
			        <div class="item-inner">
			          <div class="item-title label">选择用户</div>
			          <div class="item-subtitle label" v-html="user.linkMan"></div>
			        </div>
			      </a>
			    </li>			
			</ul>
		</div>
		<div class="content-block bottom-buttons">
			<div class="row no-gutter">
				<!-- <div class="col-50">
					<a class="button button-big button-fill" @click="ok()">上一步</a>
				</div> -->
				<div class="col-100">
					<a class="button button-big button-fill color-green" @click="next()">下一步</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import {mapState} from 'vuex'
	import {eventBus, event} from '../../../eventbus.js'
	export default {
		data() {
			return {
				certTypeKey: [1,2,3,4,5,6,9,10,11,12,13,18,20,35,37,38,39,40,41,42,43,44,45,46,47,99,0],
				certTypeValue: ['身份证','士官证','税务证','代理商身份','电信识别号','驾驶证','护照','社保卡','组织机构代码','户口卡','客户标识码','集团客户标识码','工商营业执照','单位公章','军官证','港澳台通行证','学生证','集团客户证件','代扣号','其他','圈集团','经办人身份证','经办人其他证件','政企-其他','个人-其他','代理商','缺省类型'],
				identifyType: 1,
				userNumber: '',
				identNumber: '',
				selType: 1,
				wait: false,
				user: {}
			}
		},
		created() {
			let that = this
			eventBus.$on(event.CHOICE_USER, (data) => {
				if(that.wait) {
					that.wait = !that.wait
					that.user = data
				}
			})
		},
		methods: {
			ok() {
				var that = this
				this.$store.dispatch('setUser', {
					data: this.data,
					callback: () => {
						that.$emit('change-step', true)
					}
				})
			},
			userRowClick() {
				if(this.identifyType=='') {
					this.$f7.alert('请选择证件类型', '提示')
					return
				}
				if(this.userNumber==''&&this.identNumber=='') {
					this.$f7.alert('请填写证件号/接入号', '提示')
					return
				}
				let selType, value
				if (this.userNumber!='') {
					selType = 2
					value = this.userNumber
				} else if (this.identNumber!='') {
					selType = 3
					value = this.identNumber
				} else {
					selType = 1
					value = this.userNumber
				}
				this.wait = !this.wait
				this.$f7.mainView.router.load({url: `/list/user/?identifyType=${this.identifyType}&selType=${selType}&value=${value}`})
			},
			next() {
				if(!this.user.partyId) {
					this.$f7.alert('请选择用户', '提示')
					return
				}
				this.$store.dispatch('updateWidebandUserData', {
					data: this.user,
					callback: () => {
						this.$emit('step-change', true)
					}
				})
			}
		}
	}
</script>