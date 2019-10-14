import {about} from '../components/aboutme/about.js'
const routerObj = new VueRouter({
  routes: [
    {path: "/main", component: about},
  ]
})

const vm = new Vue({
  el: '#app',
  data: {},
  methods: {
    
  },
  router: routerObj
})