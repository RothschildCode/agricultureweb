<template>
	<div class="wide-band-frame">
		<business-process-bar :step="step" :list="businessProcess"></business-process-bar>
		<div class="tabs subtoolbar-fixed">
			<div class="tab" :class="{active: step == 1}">
				<user-info @change-step="changeStep"></user-info>
			</div>
			<div class="tab" :class="{active: step == 2}">
				<serv-pack @change-step="changeStep"></serv-pack>
			</div>
			<div class="tab" :class="{active: step == 3}">
				<info-filling @change-step="changeStep"></info-filling>
			</div>
			<div class="tab" :class="{active: step == 4}">
				<div class="list-block">
					
				</div>
			</div>									
		</div>
	</div>
</template>

<script type="text/javascript">
	import BusinessProcessBar from './BusinessProcessBar.vue'
	import UserInfo from './UserInfo.vue'
	import ServPack from './ServPack.vue'
	import InfoFilling from './InfoFilling'
	import BusinessProcess from '../local/BusinessProcess.json'
	export default{
		data() {
			return {
				list: [
					{
						label: '用户信息',
						step: 1
					},
					{
						label: '套餐选择',
						step: 2
					},
					{
						label: '信息填写',
						step: 3
					},
					{
						label: '信息确认',
						step: 4
					}
				],
				step: 1
			}
		},
		methods: {
			changeStep(dir) {
				this.step += dir ? 1 : -1
			}
		},
		components: {
			BusinessProcessBar,
			UserInfo,
			ServPack,
			InfoFilling
		}
	}
</script>