export default {
  template: '<div id="map"></div>',
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
    initMap(){
      let baseLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
        })
      })
  
      this.view = new ol.View({
        projection: 'EPSG:4326',
        zoom: 4,
        center: [114, 32]
      })
  
      this.map = new ol.Map({
        target: 'map',
        layers: [baseLayer],
        view: this.view
      })
    }
  }
}