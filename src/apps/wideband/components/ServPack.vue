<template>
	<div class="serv-pack bottom-buttons-fixed">
		<div class="content-block-title">套餐及资费</div>	
		<div class="list-block">
			<ul>
			    <li>
			      <a class="item-link item-content" @click="offerRowClick()">
			        <div class="item-media"><i class="icon icon-form-name"></i></div>
			        <div class="item-inner">
			          <div class="item-title label">套餐选择</div>
			          <div class="item-subtitle label" v-html="offer.offername"></div>
			        </div>
			      </a>
			    </li>
			    <li>
			      <a class="item-link item-content" @click="priceRowClick()">
			        <div class="item-media"><i class="icon icon-form-name"></i></div>
			        <div class="item-inner">
			          <div class="item-title label">资费选择</div>
			          <div class="item-subtitle label" v-html="offerSpec.offerSpecName"></div>
			        </div>
			      </a>
			    </li>				
			</ul>
		</div>
		<div class="content-block" v-html="offerSpec.desc"></div>
		<div class="content-block-title">其他信息</div>		
		<div class="list-block">
			<ul>			    			
			    <li>
			      <div class="item-content">
			        <div class="item-media">
			        	<i class="icon icon-form-name">*</i>
			        </div>
			        <div class="item-inner">
			          <div class="item-title label">局向现实</div>
			          <div class="item-input">
			            <input type="text" placeholder="">
			          </div>
			        </div>
			      </div>
			    </li>	
			    <li>
			      <div class="item-content">
			        <div class="item-media">
			        	<i class="icon icon-form-name">*</i>
			        </div>
			        <div class="item-inner">
			          <div class="item-title label">IPTV销售品</div>
			          <div class="item-input">
			            <input type="text" placeholder="">
			          </div>
			        </div>
			      </div>
			    </li>	
			    <li>
			      <div class="item-content">
			        <div class="item-media">
			        	<i class="icon icon-form-name">*</i>
			        </div>
			        <div class="item-inner">
			          <div class="item-title label">联系人</div>
			          <div class="item-input">
			            <input type="text" placeholder="">
			          </div>
			        </div>
			      </div>
			    </li>	
			    <li>
			      <div class="item-content">
			        <div class="item-media">
			        	<i class="icon icon-form-name">*</i>
			        </div>
			        <div class="item-inner">
			          <div class="item-title label">联系电话</div>
			          <div class ="item-input">
			            <input type="text" placeholder="">
			          </div>
			        </div>
			      </div>
			    </li>
			    <li>
			      <div class="item-content">
			        <div class="item-media">
			        	<i class="icon icon-form-name">*</i>
			        </div>
			        <div class="item-inner">
			          <div class="item-title label">经办人</div>
			          <div class="item-input">
			            <input type="text" placeholder="">
			          </div>
			        </div>
			      </div>
			    </li>
			    <li>
			      <div class="item-content">
			        <div class="item-media">
			        	<i class="icon icon-form-name">*</i>
			        </div>
			        <div class="item-inner">
			          <div class="item-title label">订单备注</div>
			          <div class="item-input">
			            <textarea rows="3"></textarea>
			          </div>
			        </div>
			      </div>
			    </li>				    		
			</ul>
		</div>

		<div class="content-block bottom-buttons">
			<div class="row no-gutter">
				<div class="col-50">
					<a class="button button-big button-fill color-white" @click="stepChange(false)">上一步</a>
				</div>
				<div class="col-50">
					<a class="button button-big button-fill color-green" @click="stepChange(true)">下一步</a>
				</div>
			</div>
		</div>

	</div>
</template>

<script type="text/javascript">
	import ScrollList from './ScrollList'
	import {eventBus, event} from '../../../eventbus.js'
	export default {
		data() {
			return {
				offer: {},
				offerSpec: {},

			}
		},
		created() {
			var that = this
			eventBus.$on(event.CHOICE_OFFER, (data) => {
				that.offer = data
			})
			eventBus.$on(event.CHOICE_OFFER_SPEC, (data) => {
				that.offerSpec = data
			})
		},
		methods: {
			offerRowClick() {
				var partyId = this.$store.state.wideband.user.partyId
				this.$f7.mainView.router.load({url: `/list/offer/?partyId=${partyId}`})
			},
			priceRowClick() {
				if(!this.offer.category) {
					this.$f7.alert('请先选择套餐', '提示')
					return
				}
				var partyId = this.$store.state.wideband.user.partyId
				this.$f7.mainView.router.load({url: `/list/price/?category=${this.offer.category}&partyId=${partyId}`})
			},
			stepChange(next) {
				// if(next) {
				// 	this.$store.dispatch('updateWidebandServData', {
				// 		data: {

				// 		}
				// 	})
				// }else {
				// 	this.$emit('step-change', next)
				// }
				this.$emit('step-change', next)
			}
		},
		components: {
			ScrollList
		}
	}
</script>