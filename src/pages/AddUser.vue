<template>
	<div class="page navbar-fixed" data-page="list">
		<div class="navbar">
			<div class="navbar-inner">
				<div class="left">
					<a class="link show icon-only back">
						<i class="f7-icons">left</i>
					</a>
				</div>
				<div class="center">
					<span>新增客户</span>
				</div>
				<div class="right"></div>
			</div>
		</div>
		<div class="page-content">
			<div class="list-block">
				<ul>			
				    <li>
				      <div class="item-content">
				        <div class="item-media"><i class="icon icon-form-name"></i></div>
				        <div class="item-inner">
				          <div class="item-title label">客户名称</div>
				          <div class="item-input">
				            <input type="text" name="">
				          </div>
				        </div>
				      </div>
				    </li>
				    <li>
				      <div class="item-content">
				        <div class="item-media"><i class="icon icon-form-name"></i></div>
				        <div class="item-inner">
				          <div class="item-title label">证件地址</div>
				          <div class="item-input">
				            <input type="text" placeholder="">
				          </div>
				        </div>
				      </div>
				    </li>
				    <li>
				      <div class="item-content">
				        <div class="item-media"><i class="icon icon-form-name"></i></div>
				        <div class="item-inner">
				          <div class="item-title label">证件类型</div>
				          <div class="item-input">
				            <select>
				            	<option></option>
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
				            <input type="text" placeholder="">
				          </div>
				        </div>
				      </div>
				    </li>
				   	<li>
				      <div class="item-content">
				        <div class="item-media"><i class="icon icon-form-name"></i></div>
				        <div class="item-inner">
				          <div class="item-title label">客户住址</div>
				          <div class="item-input">
				            <input type="text" placeholder="">
				          </div>
				        </div>
				      </div>
				    </li>
				    <li>
				      <div class="item-content">
				        <div class="item-media"><i class="icon icon-form-name"></i></div>
				        <div class="item-inner">
				          <div class="item-title label">电子邮件</div>
				          <div class="item-input">
				            <input type="text" placeholder="">
				          </div>
				        </div>
				      </div>
				    </li>
				    <li>
				      <div class="item-content">
				        <div class="item-media"><i class="icon icon-form-name"></i></div>
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
				        <div class="item-media"><i class="icon icon-form-name"></i></div>
				        <div class="item-inner">
				          <div class="item-title label">联系号码</div>
				          <div class="item-input">
				            <input type="text" placeholder="">
				          </div>
				        </div>
				      </div>
				    </li>
				</ul>
			</div>

			<div class="content-block bottom-buttons">
				<div class="row no-gutter">
					<div class="col-70">
						<div class="actionbar">
							<div class="ico-button">
								<div class="ico f7-icons">camera</div>
								<div class="label">人脸识别</div>
							</div>
							<div class="ico-button">
								<div class="ico f7-icons">camera</div>
								<div class="label">读卡</div>
							</div>
						</div>
					</div>
					<div class="col-30">
						<a class="button button-big button-fill color-green">新增</a>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		// methods: {
		// 	ok() {
		// 		var that = this
		// 		this.$store.dispatch('addUser', {
		// 			data: this.user,
		// 			callback: (data) => {
		// 				that.$emit(event.ADD_USER_SUCC, data)
		// 				that.$f7.mainView.router.back()
		// 			}
		// 		})
		// 	}
		// }
	}
</script>