<template>
	<div class="info-filling bottom-buttons-fixed">
		<div class="list-block">
		  <ul>
		    <!-- Text inputs -->
		    <li>
		      <a class="item-link item-content">
		        <div class="item-media"><i class="icon icon-form-name"></i></div>
		        <div class="item-inner">
		        	<div class="item-title">安装地址</div>
		        </div>
		      </a>
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
	export default {
		methods: {
			stepChange(next) {
				this.$emit('step-change', next)
			}
		}
	}
</script>