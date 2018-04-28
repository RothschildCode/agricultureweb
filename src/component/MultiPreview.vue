<template>
  	<div class="multi-preview">
  		<div class="multi-content" :style="{width: (95 * (multis.length + 1)) + 10 + 'px'}">
	  		<div v-for="(item, index) in multis" class="item">
	  			<span class="item-span" :style="{'background-image': item}"></span>
	  			<a class="item-close" @click="removeMulti(index)">
	  				<span class="btn-close"></span>
	  			</a>
	  		</div>
	  		<div class="item add">
	  			<input type="file" name="" class="upload-input" ref="uploadInput2" @change="uploadChange">
	  		</div>			  			
  		</div>
  	</div>
</template>
<script type="text/javascript">
	export default {
		props: ['multis'],
		methods: {
			uploadChange(e) {
				var _this = this
				var loader = e.target
				var _URL = window.URL || window.webkitURL;
			    var file
			    if ((file = loader.files[0])) {
			        var reader = new FileReader();
			        reader.readAsDataURL(file);
			        reader.onload = function (e) { 
			        	_this.selectedMulti(this.result)
			        }
			    }
			    $(loader).val('')
			},
			selectedMulti(base64Data) {
				this.multis.push('url("' + base64Data + '")')
			},			
			removeMulti(i) {
				this.multis.splice(i, 1)
			}				
		}
	}
</script>