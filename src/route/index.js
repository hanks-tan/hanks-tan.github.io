import Air from '@/view/app-ol/airPointMap/Air'
import CssFilter from '@/view/app-ol/cssFilter/CssFilter'
import VueRouter from 'vue-router'
const routes = [
  { path: '/', name: 'firstPage', component: null, meta: { title: '首页' } },
  { path: '/ol/air', name: 'olAirPointMap', component: Air, meta: { title: '空气质量散点图' } },
  { path: '/ol/css-filter', name: 'cssFilter', component: CssFilter, meta: { title: '地图背景色切换' } },
  { path: '/ol/kriging', name: 'kriging', component: undefined, meta: { title: '克里金插值' } },
  { path: '/ol/china-gdp-map', name: 'china-gdp-map', component: undefined, meta: { title: '全国GPD地图' } }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' | WebGIS之路'
  next()
})

export default router
