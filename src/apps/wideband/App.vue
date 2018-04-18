<template>
  <!-- App -->
  <div id="app">

  <div class="panel-overlay"></div>
 
  <!-- Left Panel with Reveal effect -->
  <div class="panel panel-left panel-reveal">
    <div class="content-block">
      <p>Left Panel content here</p>
      <!-- Click on link with "close-panel" class will close panel -->
      <p><a href="#" class="close-panel">Close me</a></p>
      <!-- Click on link with "open-panel" and data-panel="right" attribute will open Right panel -->
      <p><a href="#" data-panel="right" class="open-panel">Open Right Panel</a></p>
    </div>
  </div>

    <!-- Main Views -->
    <f7-views>
      <f7-view id="main-view"  main>
        <f7-pages>
          <user-info-config routeTo="/wideband/"></user-info-config>
        </f7-pages>
      </f7-view>
    </f7-views>
  </div>
</template>

<script>
  import UserInfoConfig from '../../pages/UserInfoConfig'
  import {mapState} from 'vuex'
  export default {
    components: {
      UserInfoConfig
    }
  }
</script>