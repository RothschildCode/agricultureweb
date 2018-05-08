<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view"  main>
	    <div class="navbar">
	      <div class="navbar-inner h-auto">
	        <div class="subnavbar">
	          <div class="buttons-row">
	            <a href="#tab1" class="button tab-link active">新闻</a>
	            <a href="#tab2" class="button tab-link">品牌管理</a>
	            <a href="#tab3" class="button tab-link">品牌故事</a>
	            <a href="" class="button tab-link">新农人</a>
	            <a href="" class="button tab-link">政府监管</a>
	          </div>
	        </div>
	      </div>
	    </div>      
        <f7-pages>
			<div data-page="news" class="page news-page navbar-through">			
				<news-wrapper></news-wrapper>
			</div>
        </f7-pages>
      </f7-view>
    </f7-views>
  </div>
</template>

<script>
	import NewsWrapper from '../component/NewsWrapper'
	export default {
		components: {
			NewsWrapper
		}
	}
</script>