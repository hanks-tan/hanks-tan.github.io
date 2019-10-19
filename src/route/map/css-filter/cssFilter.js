import mapView from '/src/components/mapView.js'

export default {
  template: '<div>\
                <div class="input-group-btn">\
                  <button v-for="(item, key) in buttons" :key="item.id" @click="changeFilter(item.filterValue)" type="button" class="btn btn-default">{{item.name}}</button>\
                </div>\
                <map-view ref="mapview"></map-view>\
              </div>',
  data() {
    return {
      buttons: [
        {id: 1, name: '反色', filterValue: 'invert'},
        {id: 2, name: '褐色', filterValue: 'sepia'},
        {id: 3, name: '灰度', filterValue: 'grayscale'},
        {id: 4, name: '复合滤镜', filterValue: 'complex'},
        {id: 5, name: '原色', filterValue: 'none'},
      ],
      filter: '',
      map: null
    }
  },
  mounted() {
    this.init()
  },
  components: {mapView},
  methods: {
    init(){
      
      this.map = this.$refs['mapview'].map

      this.map.on('precompose', evt =>{
        let ctx = evt.context;
        ctx.filter = this.filter;
      })
    },
    changeFilter(type){
      if(type !== 'none'){
        type += '(100%)';
      }
      this.filter = type;
      this.map.render();
    }
  },
}

