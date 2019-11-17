<template>
  <div id="map" class="mapview"></div>
</template>

<script>
import {Map,View} from 'ol'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
export default {
  data() {
    return {
      view: undefined,
      map: undefined  
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      console.log('in mapview components')
      let baseLayer = new TileLayer({
        source: new XYZ({
          url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
        })
      })

      this.view = new View({
        projection: 'EPSG:4326',
        zoom: 4,
        center: [114, 32]
      })

      this.map = new Map({
        target: 'map',
        view: this.view,
        layers: [baseLayer]
      })
    }
  }
}
</script>

<style>
  @import url('~ol/ol.css');
  .mapview{
    height: 680px;
    width: 100%;
  }
  .ol-zoom{
    display: none;
  }
  .ol-attribution{
    display: none;
  }
</style>