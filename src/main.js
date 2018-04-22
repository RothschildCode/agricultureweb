import Vue from 'vue'
import 'framework7'
import Framework7Vue from 'framework7-vue'
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
import Framework7Icons from 'framework7-icons/css/framework7-icons.css'
import AppStyles from './css/app.less'
// import Routes from './routes.js'
// import store from './store/index'
import jquery from 'jquery'

import util from './util'

import './common/util'

export function initEntry(App) {
  Vue.use(Framework7Vue)
  new Vue({
    el: '#app',
    // store,
    template: '<app/>',
    framework7: {
      root: '#app',
      // routes: Routes,
      // animatePages: false
    },
    components: {
      app: App
    }
  })  
}

window.__ComponentExtend__ = {
  pullRefresh: {
    component: null
  }
}