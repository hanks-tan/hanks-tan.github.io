import Air from '/src/map/openlayers/air/air.js'

const Conver = {template: '<div>Conver</div>'}
const River = {template: '<div>fence</div>'}

const routes = [
  {path: '/conver', component: Conver},
  {path: '/fence', component: River},
  {path: '/air', component: Air}
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
        {name:'air', path:'/air', title: '空气质量图'}
      ]
    }
  },
  router
}).$mount('#app')