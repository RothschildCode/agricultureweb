import Vuex from 'vuex'
import Vue from 'vue'
import WideBandModule from './wideband'
import UsersModule from './users'
import UicModule from './userinfoconfig'
import BuildingModule from './building'
import BrandDirectionModule from './branddirection'
import OfferModule from './offer'

Vue.use(Vuex)

var modules = {
  wideband: WideBandModule,
  users: UsersModule,
  uic: UicModule,
  building: BuildingModule,
  branddir: BrandDirectionModule,
  offer: OfferModule
}

export default new Vuex.Store({
  modules
})