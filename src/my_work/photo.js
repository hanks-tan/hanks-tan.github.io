import {template} from '../components/photolist/photolist.js'
var vm = new Vue({
  el: '#app',
  data: {
    photoList: [
      {id:1, name: '全国空气质量', src: './img/china_air.PNG', desc: '全国主要城市空气质量渲染图'},
      {id:1, name: '动态风场', src: './img/windy.gif', desc: '风力场的地图表现效果'},
      {id:1, name: '流线图', src: './img/traffic.gif', desc: '流动的线条'},
    ]
  },
  methods: {
    
  },
  components: {
    photo: template
  }
})