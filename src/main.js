import Vue from 'vue'
import 'framework7'
import Framework7Vue from 'framework7-vue'
import jquery from 'jquery'
import './plugins/brow/iconfont.js'
import MeScroll from './plugins/mescroll/mescroll.js'
import './common/util'

import 'framework7/dist/css/framework7.ios.min.css'
import 'framework7/dist/css/framework7.ios.colors.min.css'
import 'framework7-icons/css/framework7-icons.css'
import './plugins/mescroll/mescroll.css'
import './css/app.less'
import {$ajax} from './core/http.js'
import appUtil from './common/app'

Vue.prototype.$ajax = $ajax
Vue.prototype.appUtil = appUtil

export function initEntry(App) {
  Vue.use(Framework7Vue)
  new Vue({
    el: '#app',
    template: '<app/>',
    framework7: {
      root: '#app'
    },
    components: {
      app: App
    }
  })
}