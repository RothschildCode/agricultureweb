<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view"  main>
        <f7-pages>
			<div data-page="news" class="page navbar-fixed toobar-fixed news-page">
				<news-list></news-list>
			</div>
        </f7-pages>
      </f7-view>
    </f7-views>
  </div>
</template>

<script>
	import NewsList from '../component/NewsList'
	export default {
		components: {
			NewsList
		}
	}
</script>