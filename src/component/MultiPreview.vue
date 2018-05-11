<template>
  	<div class="multi-preview">
  		<canvas ref="cvs" style="display: none;"></canvas>
  		<div class="multi-content" :style="{width: (95 * (multis.length + 1)) + 10 + 'px'}">
	  		<div v-for="(item, index) in multis" class="item">
	  			<span class="item-span" :style="{'background-image': item}"></span>
	  			<a v-if="!readonly" class="item-close" @click="removeMulti(index)">
	  				<span class="btn-close"></span>
	  			</a>
	  		</div>
	  		<div v-if="!readonly" class="item add">
	  			<input type="file" name="" class="upload-input" ref="uploadInput2" @change="uploadChange">
	  		</div>
  		</div>
  	</div>
</template>
<script type="text/javascript">
	export default {
		props: ['data', 'urls', 'readonly'],
		data() {
			return {
				maxSize: 320,//图片最大尺寸,用于图片压缩
				multis: []
			}
		},
		created() {
			if(this.readonly) {
				this.multis = this.urls
			}
		},
		methods: {
			uploadChange(e) {
				var _this = this
				var loader = e.target
				var _URL = window.URL || window.webkitURL;
			    var file
			    if ((file = loader.files[0])) {
			    	_this.compress(file)//图片压缩
			    }
			    $(loader).val('')
			},
			compress(file) {
				var _this = this
		    	var image = new Image()
		    	var scale = 1
		    	image.src = URL.createObjectURL(file)
		    	image.onload = function() {
		    		var cvs = _this.$refs.cvs
		    		if(this.width > _this.maxSize || this.height > _this.maxSize) {
		    			if(this.width > this.height) {
		    				scale = _this.maxSize / this.width
		    			}else {
		    				scale = _this.maxSize / this.height
		    			}
		    		}
		    		cvs.width = this.width * scale
		    		cvs.height = this.height * scale
		    		var ctx = cvs.getContext('2d')
		    		ctx.drawImage(this, 0, 0, cvs.width, cvs.height)
		    		var newImageData = cvs.toDataURL('image/jpeg', 0.7)
            		// var base64Data = newImageData.replace('data:base64', 'data:image/jpeg;base64');
            		// _this.selectedMulti(base64Data)

            		_this.selectedMulti(newImageData.replace('data:base64', 'data:image/jpeg;base64'))
            		_this.data.push(newImageData.replace('data:image/jpeg;base64,', ''))

		    	}
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