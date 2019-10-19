import Air from '/src/route/map/openlayers/air/air.js'
import cssFilter from  './src/route/map/css-filter/cssFilter.js'

const Conver = {template: '<div>Conver</div>'}
const River = {template: '<div>fence</div>'}

const routes = [
  {path: '/', component: null},
  {path: '/conver', component: Conver},
  {path: '/fence', component: River},
  {path: '/air', component: Air},
  {path: '/css-filter', component: cssFilter}
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  data(){
    return {
      openlayers:[
        {name:'conver', path:'/conver', title: '遮罩'},
        {name:'fence', path:'/fence', title: '电子围栏'},
        {name:'air', path:'/air', title: '空气质量图'},
        {name:'css-filter', path:'/css-filter', title: 'css过滤器应用'}
      ]
    }
  },
  router
}).$mount('#app')