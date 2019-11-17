<template>
  <div>
    <map-view ref="mapview"></map-view>
  </div>
</template>

<script>
import MapView from '/src/components/_public/MapView'
export default {
  data() {
    return {
      map: undefined
    }
  },
  mounted() {
    
  },
  components: {MapView},
  methods: {
    init(){
      this.map = this.$refs.mapview.map
      Promise.all(this.getData())
      this.getData('/api/air').then(data => {
        this.showKrigingMap()
      })
    },
    getData(api){
      return this.axios.get(api).then(response => {
        return response.data
      })
    },

    showKrigingMap (data){
      let airLayer = new AirLayer({
        map: this.map,
        geojson: '',
        region: undefined
      })
    }

    formatData(){
      
    }
  },
}
</script>