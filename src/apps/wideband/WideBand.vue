<template>
	<div data-page="home" class="page navbar-fixed toobar-fixed wideband-page">
		<div class="navbar">
			<div class="navbar-inner">
				<div class="left">
							
				</div>
				<div class="center">
				<span>宽带</span>
				</div>
				<div class="right">
		
				</div>
				<div class="subnavbar process-bar">
			        <a v-for="(item, index) in list" class="process-bar-item" :class="{active:step > item.step}">
			            <i class="f7-icons" :class="{active: step >= item.step}" v-html="step >= item.step ? item.f7ActiveIco : item.f7NormalIco"></i>
			            <br>
			            <span class="tabbar-label" v-html="item.label"></span>
			        </a>
				</div>
			</div>
		</div>
	  <div class="page-content">
	    <div class="tabs subtoolbar-fixed">
	      <div class="tab" :class="{active: step == 1}">
	        <user-info @step-change="stepChange"></user-info>
	      </div>
	      <div class="tab" :class="{active: step == 2}">
	        <serv-pack @step-change="stepChange"></serv-pack>
	      </div>
	      <div class="tab" :class="{active: step == 3}">
	        <info-filling @step-change="stepChange"></info-filling>
	      </div>
	      <div class="tab" :class="{active: step == 4}">
	        <div class="list-block">
	          
	        </div>
	      </div>                  
	    </div>
	  </div>
	</div>	
</template>

<style lang="less">
	.wideband-page {
		.process-bar {
			background: #fff;
			height: auto;
			.process-bar-item {
				padding: .5em 0;
				text-align: center;
				color: #000;
				.f7-icons {
					color: #676767;
					&.active {
						color: #65d213;
					}
				}
			}
		}
		.page-content {
			margin-top: 4em;
		}
	}
</style>

<script>
  import UserInfo from './components/UserInfo.vue'
  import ServPack from './components/ServPack.vue'
  import InfoFilling from './components/InfoFilling'
  import {mapState} from 'vuex'
  export default {
  	data() {
  		return {
  			step: 1,
			list: [
				{
					label: '用户信息',
					step: 1,
					f7NormalIco: 'person',
					f7ActiveIco: 'person_fill'
				},
				{
					label: '套餐选择',
					step: 2,
					f7NormalIco: 'bag',
					f7ActiveIco: 'bag_fill'
				},
				{
					label: '信息填写',
					step: 3,
					f7NormalIco: 'compose',
					f7ActiveIco: 'compose_fill'
				},
				{
					label: '信息确认',
					step: 4,
					f7NormalIco: 'check_round',
					f7ActiveIco: 'check_round_fill'
				}
			],  			
  		}
  	},
  	methods: {
  		stepChange(next) {
  			console.log(3)
  			this.step += next?1:-1
  		}
  	},
    components: {
      UserInfo,
      ServPack,
      InfoFilling
    }
  }
</script>