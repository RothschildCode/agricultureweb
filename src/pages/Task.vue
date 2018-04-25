<template>
  <!-- App -->
  <div id="app">
    <f7-views>
      <f7-view id="main-view"  main>
        <f7-pages>
			<div data-page="task" class="page navbar-fixed toobar-fixed task-page bg-fill">

				<div class="list-block media-list task-list">
				  

				</div>

			</div>
        </f7-pages>
      </f7-view>
    </f7-views>
  </div>
</template>

<script>
	import TaskClassifyList from '../component/TaskClassifyList'
	export default {
		components: {
			TaskClassifyList
		}
	}
</script>