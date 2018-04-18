export default [
    {
        path: '/uic/',
        component: require('./pages/UserInfoConfig.vue')
    },
    {
        path: '/wideband/',
        component: require('./apps/wideband/WideBand.vue')
    },
    {
        path: '/list/building/',
        component: require('./pages/BuildingList.vue')
    },
    {
        path: '/list/branddirection/',
        component: require('./pages/BrandDirectionList.vue')
    },
    {
        path: '/list/user/',
        component: require('./pages/UserList.vue')
    },
    {
        path: '/list/offer/',
        component: require('./pages/OfferList.vue')
    },
    {
        path: '/list/price/',
        component: require('./pages/PriceList.vue')
    },
    {
        path: '/add/user/',
        component: require('./pages/AddUser.vue')
    }
]