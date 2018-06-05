<template>
	<div class="footer-nav common-editor">
		<div class="wrap">
			<div class="row">
				<div class="col-75 editor-wrap" @click="onclick" style="background: #f4f4f5; border-radius: 1rem; padding: 0 1rem;">
					<span class="f7-icons fontsize-1x">compose</span>
					写评论...
				</div>
<!-- 				<div class="col-25">
					<a href="">
						<span class="f7-icons fontsize-1x">compose</span>
					</a>
					全部
				</div> -->
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: ['pid'],	
		methods: {
			onclick() {
				app.openCommPopup({pid: this.pid})
			}
		}
	}
</script>