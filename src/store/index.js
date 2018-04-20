import Vuex from 'vuex'
import Vue from 'vue'
import NewsModule from './news'

Vue.use(Vuex)

var modules = {
	news: NewsModule
}

export default new Vuex.Store({
  modules
})