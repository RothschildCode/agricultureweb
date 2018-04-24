<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view"  main>
        <f7-pages>
			<div data-page="news" class="page toobar-fixed news-page">			
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